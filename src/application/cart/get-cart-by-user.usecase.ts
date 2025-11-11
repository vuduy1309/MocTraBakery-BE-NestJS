import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../../domain/cart/cart.repository';

@Injectable()
export class GetCartByUserUseCase {
  constructor(@Inject('ICartRepository') private cartRepo: ICartRepository) {}

  async execute(userId: string) {
    const cart = await this.cartRepo.findByUserId(userId);
    if (!cart) return { items: [], total: 0 };
    let total = 0;
    const items = cart.items.map((item: any) => {
      const prod: any = item.productId && typeof item.productId === 'object' ? item.productId : null;
      let discountPercent = 0;
      if (prod && prod.discountId && typeof prod.discountId === 'object' && prod.discountId.percent) {
        discountPercent = prod.discountId.percent;
      }
      const priceAfterDiscount = discountPercent ? Math.round(item.price * (1 - discountPercent / 100)) : item.price;
      total += priceAfterDiscount * item.quantity;
      return {
        productId: prod
          ? {
              _id: prod._id,
              name: prod.name,
              images: prod.images,
              image: prod.image,
              description: prod.description,
              price: prod.price,
              sizes: prod.sizes,
              origin: prod.origin,
              isVegetarian: prod.isVegetarian,
              isRefrigerated: prod.isRefrigerated,
              calories: prod.calories,
              category: prod.categoryId && typeof prod.categoryId === 'object' ? prod.categoryId.name : prod.categoryId,
              discount: prod.discountId && typeof prod.discountId === 'object' ? { name: prod.discountId.name, percent: prod.discountId.percent } : prod.discountId,
            }
          : null,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        priceAfterDiscount,
        discountPercent,
      };
    });
    return { items, total };
  }
}
