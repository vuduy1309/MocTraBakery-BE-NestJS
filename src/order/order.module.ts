import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Order,
  OrderSchema,
} from '../infrastructure/mongoose/order/order.schema';
import { OrderController } from './order.controller';
import { VnpayAdapter } from '../infrastructure/vnpay/vnpay.adapter';
import { OrderCleanupService } from './order-cleanup.service';
import { forwardRef } from '@nestjs/common';
import { CartModule } from '../cart/cart.module';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { MongooseOrderRepository } from '../infrastructure/mongoose/order/order.repository';
import { CreateOrderUseCase } from '../application/order/create-order.usecase';
import { FindOrderUseCase } from '../application/order/find-order.usecase';
import { ListOrdersUseCase } from '../application/order/list-orders.usecase';
import { MarkPaidUseCase } from '../application/order/mark-paid.usecase';
import { UpdateOrderStatusUseCase } from '../application/order/update-order-status.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    forwardRef(() => CartModule),
    forwardRef(() => UserModule),
    forwardRef(() => ProductModule),
  ],
  providers: [
    MongooseOrderRepository,
    { provide: 'IOrderRepository', useClass: MongooseOrderRepository },
    CreateOrderUseCase,
    FindOrderUseCase,
    ListOrdersUseCase,
    MarkPaidUseCase,
    UpdateOrderStatusUseCase,
    VnpayAdapter,
    { provide: 'IVnpayProvider', useClass: VnpayAdapter },
    OrderCleanupService,
  ],
  controllers: [OrderController],
  exports: [
    { provide: 'IOrderRepository', useClass: MongooseOrderRepository },
    CreateOrderUseCase,
    FindOrderUseCase,
    ListOrdersUseCase,
    MarkPaidUseCase,
    UpdateOrderStatusUseCase,
  ],
})
export class OrderModule {}
