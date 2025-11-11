import { Inject, Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../../domain/category/category.repository';

@Injectable()
export class FindAllCategoriesUseCase {
  constructor(@Inject('ICategoryRepository') private categoryRepo: ICategoryRepository) {}

  async execute(): Promise<any[]> {
    return this.categoryRepo.findAll();
  }
}
