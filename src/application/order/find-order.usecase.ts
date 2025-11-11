import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../domain/order/order.repository';

@Injectable()
export class FindOrderUseCase {
  constructor(@Inject('IOrderRepository') private orderRepo: IOrderRepository) {}

  async execute(id: string) {
    return this.orderRepo.findById(id);
  }
}
