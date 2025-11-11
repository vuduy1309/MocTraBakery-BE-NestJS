import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../../domain/product/product.repository';

@Injectable()
export class ListProductsUseCase {
  constructor(
    @Inject('IProductRepository') private readonly repo: IProductRepository,
  ) {}

  async execute() {
    return this.repo.findAll();
  }
}
