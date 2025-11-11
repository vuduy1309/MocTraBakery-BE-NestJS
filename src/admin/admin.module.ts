import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../infrastructure/mongoose/product/product.schema';
import { Order, OrderSchema } from '../infrastructure/mongoose/order/order.schema';
import { User, UserSchema } from '../infrastructure/mongoose/user/user.schema';
import { MongooseProductRepository } from '../infrastructure/mongoose/product/product.repository';
import { MongooseOrderRepository } from '../infrastructure/mongoose/order/order.repository';
import { MongooseUserRepository } from '../infrastructure/mongoose/user/user.repository';
import { GetAdminStatsUseCase } from '../application/admin/get-admin-stats.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [
    MongooseProductRepository,
    { provide: 'IProductRepository', useClass: MongooseProductRepository },
    MongooseOrderRepository,
    { provide: 'IOrderRepository', useClass: MongooseOrderRepository },
    MongooseUserRepository,
    { provide: 'IUserRepository', useClass: MongooseUserRepository },
    GetAdminStatsUseCase,
  ],
})
export class AdminModule {}
