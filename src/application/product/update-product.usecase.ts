import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../../domain/product/product.repository';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('IProductRepository') private readonly repo: IProductRepository,
  ) {}

  async execute(id: string, data: any) {
    return this.repo.update(id, data);
  }
}
