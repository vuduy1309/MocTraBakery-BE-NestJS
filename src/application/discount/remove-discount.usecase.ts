import { Inject, Injectable } from '@nestjs/common';
import { IDiscountRepository } from '../../domain/discount/discount.repository';
import { IProductRepository } from '../../domain/product/product.repository';
import { Types } from 'mongoose';

@Injectable()
export class RemoveDiscountUseCase {
  constructor(
    @Inject('IDiscountRepository') private discountRepo: IDiscountRepository,
    @Inject('IProductRepository') private productRepo: IProductRepository,
  ) {}

  async execute(id: string) {
    await this.productRepo.updateManyByFilter({ discountId: new Types.ObjectId(id) }, { $unset: { discountId: '' } });
    return this.discountRepo.remove(id);
  }
}
