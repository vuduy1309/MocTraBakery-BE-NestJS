import { Model } from 'mongoose';
import { Category } from './category.schema';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<Category>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Category, {}> & Category & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
