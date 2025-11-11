import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { IOrderRepository } from '../domain/order/order.repository';

@Injectable()
export class OrderCleanupService implements OnModuleInit {
  private readonly logger = new Logger(OrderCleanupService.name);
  private intervalId: NodeJS.Timeout;

  constructor(
    @Inject('IOrderRepository') private readonly orderRepo: IOrderRepository,
  ) {}

  onModuleInit() {
    // Chạy mỗi phút
    this.intervalId = setInterval(
      () => this.cleanupPendingVnpayOrders(),
      60 * 1000,
    );
  }

  async cleanupPendingVnpayOrders() {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const result = await this.orderRepo.deleteMany({
      paymentMethod: 'vnpay',
      status: 'pending',
      createdAt: { $lt: tenMinutesAgo },
    });
    if (result && result.deletedCount && result.deletedCount > 0) {
      this.logger.log(
        `Đã tự động xóa ${result.deletedCount} đơn hàng VNPAY pending quá 10 phút.`,
      );
    }
  }
}
