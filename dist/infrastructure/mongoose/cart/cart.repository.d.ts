import { Model } from 'mongoose';
import { Cart } from './cart.schema';
import { ICartRepository } from '../../../domain/cart/cart.repository';
export declare class MongooseCartRepository implements ICartRepository {
    private cartModel;
    constructor(cartModel: Model<Cart>);
    findByUserId(userId: string): Promise<any | null>;
    create(data: any): Promise<any>;
    updateById(id: string, update: any, opts?: any): Promise<any | null>;
    updateOne(filter: any, update: any): Promise<any>;
    deleteOne(filter: any): Promise<any>;
}
