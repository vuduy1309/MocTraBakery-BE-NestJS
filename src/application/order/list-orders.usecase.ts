import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../domain/order/order.repository';

@Injectable()
export class ListOrdersUseCase {
  constructor(@Inject('IOrderRepository') private orderRepo: IOrderRepository) {}

  async execute(filter: Record<string, any> = {}, options: Record<string, any> = {}) {
    // translate options to query
    const query = { ...filter };
    // repository find accepts projection; options handled by callers
    const orders = await this.orderRepo.find(query);
    // Note: options (sort/limit/skip) currently should be handled at repo layer if needed
    return orders;
  }
}
