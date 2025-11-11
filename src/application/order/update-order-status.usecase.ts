import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../domain/order/order.repository';

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(@Inject('IOrderRepository') private orderRepo: IOrderRepository) {}

  async execute(orderId: string, status: string) {
    return this.orderRepo.findByIdAndUpdate(orderId, { status });
  }
}
