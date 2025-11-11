import { Inject, Injectable } from '@nestjs/common';
import { IDiscountRepository } from '../../domain/discount/discount.repository';
import { IProductRepository } from '../../domain/product/product.repository';

@Injectable()
export class FindAllActiveDiscountsUseCase {
  constructor(
    @Inject('IDiscountRepository') private discountRepo: IDiscountRepository,
    @Inject('IProductRepository') private productRepo: IProductRepository,
  ) {}

  async execute(): Promise<any[]> {
    const discounts = await this.discountRepo.findAllActive();
    const result = await Promise.all(
      discounts.map(async (discount) => {
        const products = await this.productRepo.find({ discountId: discount._id }, { _id: 1, name: 1, images: 1 });
        return {
          ...discount.toObject(),
          products,
        };
      }),
    );
    return result;
  }
}
