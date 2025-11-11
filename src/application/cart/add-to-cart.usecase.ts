import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../../domain/cart/cart.repository';
import { IProductRepository } from '../../domain/product/product.repository';
import { Types } from 'mongoose';

@Injectable()
export class AddToCartUseCase {
  constructor(
    @Inject('ICartRepository') private cartRepo: ICartRepository,
    @Inject('IProductRepository') private productRepo: IProductRepository,
  ) {}

  async execute(userId: string, productId: string, size: string, quantity: number) {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new Error('Sản phẩm không tồn tại');
    let price = product.price;
    if (product.sizes && product.sizes.length > 0 && size) {
      const sizeObj = product.sizes.find((s: any) => s.name === size);
      if (sizeObj) price = sizeObj.price;
    }
    const cart = await this.cartRepo.findByUserId(userId);
    if (!cart) {
      return this.cartRepo.create({
        userId: new Types.ObjectId(userId),
        items: [{ productId: new Types.ObjectId(productId), size, quantity, price }],
      });
    }
    const idx = cart.items.findIndex((i: any) => i.productId.equals(productId) && i.size === size);
    if (idx > -1) {
      cart.items[idx].quantity += quantity;
      cart.items[idx].price = price;
    } else {
      cart.items.push({ productId: new Types.ObjectId(productId), size, price, quantity });
    }
    return cart.save();
  }
}
