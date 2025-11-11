import { Controller, Get } from '@nestjs/common';
import { FindAllCategoriesUseCase } from '../application/category/find-all-categories.usecase';

@Controller('categories')
export class CategoryController {
  constructor(private readonly findAllCategoriesUseCase: FindAllCategoriesUseCase) {}

  @Get()
  async getAll() {
    return this.findAllCategoriesUseCase.execute();
  }
}
