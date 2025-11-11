import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { ICategoryRepository } from '../../../domain/category/category.repository';

@Injectable()
export class MongooseCategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.categoryModel.find().exec();
  }
}
