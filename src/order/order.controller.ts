import { Controller, Post, Body, Req, UseGuards, Get, Res, Query, Param, Patch } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsActiveGuard } from '../auth/is-active.guard';
import { VnpayService } from './vnpay.service';
import { Request, Response } from 'express';
import { CartService } from '../cart/cart.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly vnpayService: VnpayService,
    private readonly cartService: CartService,
  ) {}

  // Lấy 5-10 đơn hàng gần đây cho dashboard/manager
  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Get('recent')
  async getRecentOrders(@Req() req) {
    // Chỉ cho phép admin/manager
    if (req.user?.role !== 'Admin' && req.user?.role !== 'ProductManager') {
      return [];
    }
    const orders = await this.orderService.findAll({}, { sort: { createdAt: -1 }, limit: 10 });
    // Chuẩn hóa dữ liệu cho dashboard
    return orders.map((o: any) => ({
      code: o._id?.toString().slice(-6).toUpperCase(),
      status: o.status === 'paid' ? 'Hoàn thành' : (o.status === 'pending' ? 'Đang xử lý' : o.status),
      amount: o.total || 0,
      createdAt: o.createdAt,
    }));
  }

  // Lấy tất cả đơn hàng cho manager/admin
  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Get('all')
  async getAllOrders(@Req() req, @Query() query: any) {
    const filter: Record<string, any> = {};
    if (query.status) filter.status = query.status;
    if (query.userId) filter.userId = query.userId;
    const options: Record<string, any> = {
      sort: { createdAt: -1 },
      limit: query.limit ? parseInt(query.limit) : 50,
      skip: query.skip ? parseInt(query.skip) : 0,
    };
    return await this.orderService.findAll(filter, options);
  }

  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const order = await this.orderService.create(createOrderDto, req.user.userId);
    // Xóa cart của user sau khi đặt hàng thành công (COD, bank, vnpay đều xóa ở đây)
    await this.cartService.deleteCartByUserId(req.user.userId);
    return order;
  }

  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Post('vnpay-url')
  async getVnpayUrl(@Body('orderId') orderId: string, @Req() req: Request) {
    const order = await this.orderService.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    const clientIp = this.getClientIp(req);
    const vnpayResponse = await this.vnpayService.createPaymentUrl(order, clientIp);
    const url = vnpayResponse?.paymentUrl || vnpayResponse?.url || vnpayResponse;
    return { url };
  }

  @Get('vnpay-return')
  async vnpayReturn(@Query() query: any, @Res() res: Response) {
    const isValid = this.vnpayService.verifyReturn(query);
    if (!isValid) {
      return res.redirect('http://localhost:3001/order-fail?error=invalid_signature');
    }
    const returnData = this.vnpayService.parseReturnData(query);
    if (returnData.isSuccess) {
      const { Types } = require('mongoose');
      let orderId = returnData.orderId;
      if (orderId && Types.ObjectId.isValid(orderId)) {
        orderId = new Types.ObjectId(orderId);
      }
      await this.orderService.markPaid(orderId);
      const order = await this.orderService.findById(orderId);
      if (order && order.userId) {
        await this.cartService.deleteCartByUserId(order.userId);
      }
      return res.redirect('http://localhost:3001/order-success?orderId=' + returnData.orderId);
    } else {
      return res.redirect(`http://localhost:3001/order-fail?error=${returnData.responseCode}&message=${encodeURIComponent(returnData.message)}`);
    }
  }

  // API cập nhật trạng thái đơn hàng
  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    if (!['pending', 'paid', 'cancelled'].includes(status)) {
      return { error: 'Trạng thái không hợp lệ' };
    }
    return await this.orderService.updateStatus(id, status);
  }

  // Lấy lịch sử đơn hàng của user hiện tại
  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Get()
  async getMyOrders(@Req() req) {
    // Lấy tất cả đơn hàng của user hiện tại, mới nhất trước
    const userId = req.user.userId;
    const orders = await this.orderService.findAll({ userId }, { sort: { createdAt: -1 } });
    return orders;
  }

  // Lấy chi tiết đơn hàng
  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Get(':id')
  async getOrderDetail(@Param('id') id: string, @Req() req) {
    const order = await this.orderService.findById(id);
    if (!order) return { error: 'Order not found' };
    if (req.user?.role !== 'Admin' && req.user?.role !== 'ProductManager') {
      if (order.userId?.toString && order.userId.toString() !== req.user.userId) {
        return { error: 'Bạn không có quyền xem đơn này' };
      }
    }
    return order;
  }

  // Helper method để lấy IP client
  private getClientIp(req: Request): string {
    const forwarded = req.headers['x-forwarded-for'];
    const realIp = req.headers['x-real-ip'];
    const clientIp = req.connection?.remoteAddress || req.socket?.remoteAddress;
    let ip: string;
    if (forwarded) {
      ip = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0];
    } else if (realIp) {
      ip = Array.isArray(realIp) ? realIp[0] : realIp;
    } else {
      ip = clientIp || '127.0.0.1';
    }
    if (ip.startsWith('::ffff:')) {
      ip = ip.substring(7);
    }
    return ip;
  }
}
