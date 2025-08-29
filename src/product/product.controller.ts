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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product id');
    }
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

  @Post()
  async create(@Body() body: any) {
    if (!body.name || !body.price || !body.stock || !body.categoryId) {
      throw new BadRequestException('Thiếu trường bắt buộc');
    }
    if (typeof body.images === 'string') {
      body.images = body.images.split(',').map((s: string) => s.trim());
    }
    const created = await this.productService.create(body);
    return created;
  }

  @Get('/dashboard-stats')
  async getDashboardStats() {
    const totalProducts = await this.productService.countDocuments();

    const totalOrders = await this.orderService['orderModel'].countDocuments();

    const totalCustomers = await this.userService['userModel'].countDocuments({ role: 'Customer' });

    const orders = await this.orderService['orderModel'].find({}, { total: 1 });
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    const bestSellers = await this.productService.findBestSellers(5);

    return {
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue,
      bestSellers,
    };
  }

  @Get()
  async getAll() {
    const products = await this.productService.findAll();
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
    });
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product id');
    }
    const p = await this.productService.findById(id);
    if (!p) {
      throw new NotFoundException('Product not found');
    }
    const obj = (p as any).toObject ? (p as any).toObject() : p;
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
