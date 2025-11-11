import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../infrastructure/mongoose/category/category.schema';
import { CategoryController } from './category.controller';
import { MongooseCategoryRepository } from '../infrastructure/mongoose/category/category.repository';
import { FindAllCategoriesUseCase } from '../application/category/find-all-categories.usecase';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoryController],
  providers: [
    MongooseCategoryRepository,
    { provide: 'ICategoryRepository', useClass: MongooseCategoryRepository },
    FindAllCategoriesUseCase,
  ],
  exports: [FindAllCategoriesUseCase],
})
export class CategoryModule {}
