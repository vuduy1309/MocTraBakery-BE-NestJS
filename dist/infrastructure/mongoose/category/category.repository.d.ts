import { Model } from 'mongoose';
import { Category } from './category.schema';
import { ICategoryRepository } from '../../../domain/category/category.repository';
export declare class MongooseCategoryRepository implements ICategoryRepository {
    private categoryModel;
    constructor(categoryModel: Model<Category>);
    findAll(): Promise<any[]>;
}
