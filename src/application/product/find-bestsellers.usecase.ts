import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../../domain/product/product.repository';

@Injectable()
export class FindBestSellersUseCase {
  constructor(
    @Inject('IProductRepository') private readonly repo: IProductRepository,
  ) {}

  async execute(limit: number) {
    return this.repo.findBestSellers(limit);
  }
}
