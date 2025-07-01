import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    update(id: string, data: any): Promise<Product | null>;
    remove(id: string): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    countDocuments(): Promise<number>;
    findBestSellers(limit: number): Promise<(import("mongoose").Document<unknown, {}, ProductDocument, {}> & Product & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    create(data: any): Promise<Product>;
}
