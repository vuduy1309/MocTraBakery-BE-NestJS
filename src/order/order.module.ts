
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { VnpayService } from './vnpay.service';
import { OrderCleanupService } from './order-cleanup.service';
import { forwardRef } from '@nestjs/common';
import { CartModule } from '../cart/cart.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    forwardRef(() => CartModule),
    forwardRef(() => UserModule),
  ],
  providers: [OrderService, VnpayService, OrderCleanupService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
