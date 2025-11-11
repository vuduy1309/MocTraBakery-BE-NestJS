import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '../../domain/product/product.repository';

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject('IProductRepository') private readonly repo: IProductRepository,
  ) {}

  async execute(id: string) {
    const p = await this.repo.findById(id);
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }
}
