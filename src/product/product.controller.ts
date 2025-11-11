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
  Inject,
} from '@nestjs/common';
import { Types } from 'mongoose';

import { IOrderRepository } from '../domain/order/order.repository';
import { IUserRepository } from '../domain/user/user.repository';
import { CreateProductUseCase } from '../application/product/create-product.usecase';
import { GetProductUseCase } from '../application/product/get-product.usecase';
import { ListProductsUseCase } from '../application/product/list-products.usecase';
import { UpdateProductUseCase } from '../application/product/update-product.usecase';
import { RemoveProductUseCase } from '../application/product/remove-product.usecase';
import { CountProductsUseCase } from '../application/product/count-products.usecase';
import { FindBestSellersUseCase } from '../application/product/find-bestsellers.usecase';

@Controller('products')
export class ProductController {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly removeProductUseCase: RemoveProductUseCase,
    private readonly countProductsUseCase: CountProductsUseCase,
    private readonly findBestSellersUseCase: FindBestSellersUseCase,
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
    const updated = await this.updateProductUseCase.execute(id, updateBody);
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
    const deleted = await this.removeProductUseCase.execute(id);
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
    const created = await this.createProductUseCase.execute(body);
    return created;
  }

  @Get('/dashboard-stats')
  async getDashboardStats() {
    const totalProducts = await this.countProductsUseCase.execute();

    const totalOrders = await this.orderRepository.countDocuments();

    const totalCustomers = await this.userRepository.countDocuments({
      role: 'Customer',
    });

    const orders = await this.orderRepository.find({}, { total: 1 });
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    const bestSellers = await this.findBestSellersUseCase.execute(5);

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
    const products = await this.listProductsUseCase.execute();
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
    const p = await this.getProductUseCase.execute(id);
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
