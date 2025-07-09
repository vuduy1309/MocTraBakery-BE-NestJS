  import { Module } from '@nestjs/common';
  import { MongooseModule } from '@nestjs/mongoose';
  import { Product, ProductSchema } from './product.schema';
  import { ProductService } from './product.service';
  import { ProductController } from './product.controller';
  import { forwardRef } from '@nestjs/common';
  import { OrderModule } from '../order/order.module';
  import { UserModule } from '../user/user.module';

  @Module({
    imports: [
      MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
      forwardRef(() => OrderModule),
      UserModule,
    ],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService],
  })
  export class ProductModule {}
