import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';

@Injectable()
export class OrderCleanupService implements OnModuleInit {
  private readonly logger = new Logger(OrderCleanupService.name);
  private intervalId: NodeJS.Timeout;

  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>
  ) {}

  onModuleInit() {
    // Chạy mỗi phút
    this.intervalId = setInterval(() => this.cleanupPendingVnpayOrders(), 60 * 1000);
  }

  async cleanupPendingVnpayOrders() {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const result = await this.orderModel.deleteMany({
      paymentMethod: 'vnpay',
      status: 'pending',
      createdAt: { $lt: tenMinutesAgo },
    });
    if (result.deletedCount > 0) {
      this.logger.log(`Đã tự động xóa ${result.deletedCount} đơn hàng VNPAY pending quá 10 phút.`);
    }
  }
}
