import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';

import { ProductService } from './product.service';
import { OrderService } from '../order/order.service';
import { UserService } from '../user/user.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}

  // API: PUT /products/:id (Cập nhật sản phẩm)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product id');
    }
    if (!body.name || !body.price || !body.stock || !body.categoryId) {
      throw new BadRequestException('Thiếu trường bắt buộc');
    }
    if (typeof body.images === 'string') {
      body.images = body.images.split(',').map((s: string) => s.trim());
    }
    // Nếu có $unset, truyền đúng cho service
    let updateBody: any = { ...body };
    if (body.$unset) {
      updateBody = { ...body };
    }
    const updated = await this.productService.update(id, updateBody);
    if (!updated) {
      throw new NotFoundException('Product not found');
    }
    return updated;
  }

  // API: DELETE /products/:id (Xóa sản phẩm)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product id');
    }
    // Gọi service để xóa sản phẩm (cần có phương thức remove trong ProductService)
    if (typeof this.productService['remove'] !== 'function') {
      throw new NotFoundException(
        'Remove method not implemented in ProductService',
      );
    }
    const deleted = await (this.productService as any).remove(id);
    if (!deleted) {
      throw new NotFoundException('Product not found');
    }
    return { success: true };
  }

  // API: POST /products
  @Post()
  async create(@Body() body: any) {
    // Validate các trường bắt buộc
    if (!body.name || !body.price || !body.stock || !body.categoryId) {
      throw new BadRequestException('Thiếu trường bắt buộc');
    }
    // Xử lý images nếu là chuỗi
    if (typeof body.images === 'string') {
      body.images = body.images.split(',').map((s: string) => s.trim());
    }
    // Gọi service để tạo sản phẩm
    const created = await this.productService.create(body);
    return created;
  }

  // API: GET /products/dashboard-stats
  @Get('/dashboard-stats')
  async getDashboardStats() {
    // Tổng số sản phẩm
    const totalProducts = await this.productService.countDocuments();

    // Tổng số đơn hàng
    const totalOrders = await this.orderService['orderModel'].countDocuments();

    // Tổng số khách hàng (chỉ tính user có role là 'Customer')
    const totalCustomers = await this.userService['userModel'].countDocuments({ role: 'Customer' });

    // Tổng doanh thu (tính tổng trường total của tất cả đơn hàng)
    const orders = await this.orderService['orderModel'].find({}, { total: 1 });
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    // Sản phẩm bán chạy: lấy top 5 sản phẩm có stock thấp nhất (giả lập best seller)
    const bestSellers = await this.productService.findBestSellers(5);

    return {
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue,
      bestSellers,
    };
  }

  // API: GET /products
  @Get()
  async getAll() {
    const products = await this.productService.findAll();
    // Đảm bảo trả về đầy đủ các trường cần thiết cho FE
    return products.map((p: any) => {
      const obj = (p as any).toObject ? (p as any).toObject() : p;
      return {
        _id: obj._id,
        name: obj.name,
        description: obj.description,
        price: obj.price,
        images: obj.images,
        stock: obj.stock,
        isActive: obj.isActive,
        categoryId: obj.categoryId, // đã populate
        discountId: obj.discountId, // đã populate
        createdBy: obj.createdBy,
        createdAt: obj.createdAt,
        shelfLifeDays: obj.shelfLifeDays,
        isRefrigerated: obj.isRefrigerated,
        isVegetarian: obj.isVegetarian,
        calories: obj.calories,
        includedFlavors: obj.includedFlavors,
        packaging: obj.packaging,
        sizes: obj.sizes,
        origin: obj.origin,
      };
    });
  }

  // API: GET /products/:id
  @Get(':id')
  async getById(@Param('id') id: string) {
    // Kiểm tra id hợp lệ (ObjectId)
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product id');
    }
    const p = await this.productService.findById(id);
    if (!p) {
      throw new NotFoundException('Product not found');
    }
    const obj = (p as any).toObject ? (p as any).toObject() : p;
    // Trả về đầy đủ các trường cần thiết cho FE
    return {
      _id: obj._id,
      name: obj.name,
      description: obj.description,
      price: obj.price,
      images: obj.images,
      stock: obj.stock,
      isActive: obj.isActive,
      categoryId: obj.categoryId,
      discountId: obj.discountId,
      createdBy: obj.createdBy,
      createdAt: obj.createdAt,
      shelfLifeDays: obj.shelfLifeDays,
      isRefrigerated: obj.isRefrigerated,
      isVegetarian: obj.isVegetarian,
      calories: obj.calories,
      includedFlavors: obj.includedFlavors,
      packaging: obj.packaging,
      sizes: obj.sizes,
      origin: obj.origin,
    };
  }
}
