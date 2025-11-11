import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../../domain/cart/cart.repository';
import { Types } from 'mongoose';

@Injectable()
export class RemoveFromCartUseCase {
  constructor(@Inject('ICartRepository') private cartRepo: ICartRepository) {}

  async execute(userId: string, productId: string, size: string) {
    return this.cartRepo.updateOne({ userId: new Types.ObjectId(userId) }, { $pull: { items: { productId: new Types.ObjectId(productId), size } } });
  }
}
