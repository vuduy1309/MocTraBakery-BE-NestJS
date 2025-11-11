import { Model } from 'mongoose';
import { Discount } from './discount.schema';
import { IDiscountRepository } from '../../../domain/discount/discount.repository';
export declare class MongooseDiscountRepository implements IDiscountRepository {
    private discountModel;
    constructor(discountModel: Model<Discount>);
    findAll(): Promise<any[]>;
    findAllActive(): Promise<any[]>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any | null>;
    remove(id: string): Promise<any | null>;
    findById(id: string): Promise<any | null>;
}
