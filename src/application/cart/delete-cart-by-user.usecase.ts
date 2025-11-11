import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../../domain/cart/cart.repository';
import { Types } from 'mongoose';

@Injectable()
export class DeleteCartByUserUseCase {
  constructor(@Inject('ICartRepository') private cartRepo: ICartRepository) {}

  async execute(userId: string | Types.ObjectId) {
    const id = typeof userId === 'string' ? new Types.ObjectId(userId) : userId;
    return this.cartRepo.deleteOne({ userId: id });
  }
}
