import { Inject, Injectable } from '@nestjs/common';
import { IDiscountRepository } from '../../domain/discount/discount.repository';
import { IProductRepository } from '../../domain/product/product.repository';
import { Types } from 'mongoose';

@Injectable()
export class UpdateDiscountUseCase {
  constructor(
    @Inject('IDiscountRepository') private discountRepo: IDiscountRepository,
    @Inject('IProductRepository') private productRepo: IProductRepository,
  ) {}

  async execute(id: string, updateDiscountDto: any) {
    const { productIds, ...discountData } = updateDiscountDto;
    const discount = await this.discountRepo.update(id, discountData);
    if (!discount) throw new Error('Discount not found');
    await this.productRepo.updateManyByFilter({ discountId: discount._id }, { $unset: { discountId: '' } });
    if (productIds && Array.isArray(productIds) && productIds.length > 0) {
      await this.productRepo.updateMany(productIds, { $set: { discountId: discount._id } });
    }
    const products = await this.productRepo.find({ discountId: discount._id }, { _id: 1, name: 1, images: 1, categoryId: 1 });
    return {
      ...discount.toObject(),
      products,
    };
  }
}
