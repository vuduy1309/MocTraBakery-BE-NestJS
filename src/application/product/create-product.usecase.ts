import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../../domain/product/product.repository';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository') private readonly repo: IProductRepository,
  ) {}

  async execute(data: any) {
    return this.repo.create(data);
  }
}
