import { Inject, Injectable } from '@nestjs/common';
import { IDiscountRepository } from '../../domain/discount/discount.repository';
import { IProductRepository } from '../../domain/product/product.repository';
import { Types } from 'mongoose';

@Injectable()
export class CreateDiscountUseCase {
  constructor(
    @Inject('IDiscountRepository') private discountRepo: IDiscountRepository,
    @Inject('IProductRepository') private productRepo: IProductRepository,
  ) {}

  async execute(createDiscountDto: any) {
    const { productIds, ...discountData } = createDiscountDto;
    const discount = await this.discountRepo.create(discountData);
    if (productIds && Array.isArray(productIds) && productIds.length > 0) {
      await this.productRepo.updateMany(productIds, { $set: { discountId: discount._id } });
    }
    const products = productIds && productIds.length > 0
      ? await this.productRepo.find({ _id: { $in: productIds.map((id: string) => new Types.ObjectId(id)) } }, { _id: 1, name: 1, images: 1 })
      : [];
    return {
      ...discount.toObject(),
      products,
    };
  }
}
