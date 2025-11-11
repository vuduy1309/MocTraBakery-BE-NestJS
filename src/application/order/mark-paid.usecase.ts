import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../domain/order/order.repository';
import { IProductRepository } from '../../domain/product/product.repository';

@Injectable()
export class MarkPaidUseCase {
  constructor(
    @Inject('IOrderRepository') private orderRepo: IOrderRepository,
    @Inject('IProductRepository') private productRepo: IProductRepository,
  ) {}

  async execute(orderId: string) {
    const order = await this.orderRepo.findById(orderId);
    if (order && order.items && Array.isArray(order.items)) {
      for (const item of order.items) {
        if (item.productId) {
          try {
            const result = await this.productRepo.update(item.productId.toString(), { $inc: { stock: -item.quantity } });
            if (item.size) {
              const product = result || (await this.productRepo.findById(item.productId.toString()));
              if (product && Array.isArray(product.sizes)) {
                const sizeIndex = product.sizes.findIndex((s: any) => s.name === item.size);
                if (sizeIndex !== -1) {
                  const sizeStockPath = `sizes.${sizeIndex}.stock`;
                  await this.productRepo.update(item.productId.toString(), { $inc: { [sizeStockPath]: -item.quantity } });
                }
              }
            }
          } catch (err) {
            // swallow per original behavior
          }
        }
      }
    }
    return this.orderRepo.findByIdAndUpdate(orderId, { status: 'paid' });
  }
}
