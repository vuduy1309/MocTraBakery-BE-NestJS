import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product,
  ProductSchema,
} from '../infrastructure/mongoose/product/product.schema';
import { ProductController } from './product.controller';
import { forwardRef } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { UserModule } from '../user/user.module';
import { MongooseProductRepository } from '../infrastructure/mongoose/product/product.repository';
import { CreateProductUseCase } from '../application/product/create-product.usecase';
import { GetProductUseCase } from '../application/product/get-product.usecase';
import { ListProductsUseCase } from '../application/product/list-products.usecase';
import { UpdateProductUseCase } from '../application/product/update-product.usecase';
import { CountProductsUseCase } from '../application/product/count-products.usecase';
import { FindBestSellersUseCase } from '../application/product/find-bestsellers.usecase';
import { RemoveProductUseCase } from '../application/product/remove-product.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    forwardRef(() => OrderModule),
    UserModule,
  ],
  providers: [
    MongooseProductRepository,
    { provide: 'IProductRepository', useClass: MongooseProductRepository },
    CreateProductUseCase,
    GetProductUseCase,
    ListProductsUseCase,
    UpdateProductUseCase,
    RemoveProductUseCase,
    CountProductsUseCase,
    FindBestSellersUseCase,
  ],
  controllers: [ProductController],
  exports: [
    MongooseProductRepository,
    { provide: 'IProductRepository', useClass: MongooseProductRepository },
    CreateProductUseCase,
    GetProductUseCase,
    ListProductsUseCase,
    UpdateProductUseCase,
    RemoveProductUseCase,
    CountProductsUseCase,
    FindBestSellersUseCase,
  ],
})
export class ProductModule {}
