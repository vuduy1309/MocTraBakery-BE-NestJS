import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../domain/order/order.repository';

@Injectable()
export class CreateOrderUseCase {
  constructor(@Inject('IOrderRepository') private orderRepo: IOrderRepository) {}

  async execute(createOrderDto: any, userId: string) {
    const items = createOrderDto.items.map((item: any) => ({
      productId: item.productId,
      quantity: item.quantity,
      size: item.size,
      name: item.name,
      price: item.price,
      discountPercent: item.discountPercent,
      priceAfterDiscount: item.priceAfterDiscount,
    }));
    const order = {
      ...createOrderDto,
      items,
      userId,
      status: 'pending',
    };
    return this.orderRepo.create(order);
  }
}
