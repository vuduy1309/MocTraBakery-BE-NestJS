import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { IProductRepository } from '../../../domain/product/product.repository';
export declare class MongooseProductRepository implements IProductRepository {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any | null>;
    remove(id: string): Promise<any | null>;
    findAll(): Promise<any[]>;
    find(filter: any, projection?: any): Promise<any[]>;
    findById(id: string): Promise<any | null>;
    countDocuments(): Promise<number>;
    findBestSellers(limit: number): Promise<(import("mongoose").Document<unknown, {}, ProductDocument, {}> & Product & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    updateMany(ids: string[], update: any): Promise<any>;
    updateManyByFilter(filter: any, update: any): Promise<any>;
}
