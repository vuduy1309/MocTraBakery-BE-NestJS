import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../../domain/cart/cart.repository';
import { Types } from 'mongoose';

@Injectable()
export class UpdateItemQuantityUseCase {
  constructor(@Inject('ICartRepository') private cartRepo: ICartRepository) {}

  async execute(userId: string, productId: string, size: string, quantity: number) {
    if (quantity < 1) throw new Error('Số lượng phải lớn hơn 0');
    const cart = await this.cartRepo.findByUserId(userId);
    if (!cart) throw new Error('Cart không tồn tại');
    const idx = cart.items.findIndex((i: any) => i.productId.toString() === productId && i.size === size);
    if (idx === -1) throw new Error('Sản phẩm không có trong giỏ hàng');
    cart.items[idx].quantity = quantity;
    return cart.save();
  }
}
