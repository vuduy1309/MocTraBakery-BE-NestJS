import { Model, PipelineStage } from 'mongoose';
import { Order } from './order.schema';
import { IOrderRepository } from '../../../domain/order/order.repository';
export declare class MongooseOrderRepository implements IOrderRepository {
    private orderModel;
    constructor(orderModel: Model<Order>);
    countDocuments(filter?: any): Promise<number>;
    find(filter: any, projection?: any): Promise<any[]>;
    aggregate(pipeline: PipelineStage[]): Promise<any[]>;
    create(data: any): Promise<any>;
    findById(id: string): Promise<any | null>;
    findByIdAndUpdate(id: string, update: any, opts?: any): Promise<any | null>;
    findByIdAndDelete(id: string): Promise<any | null>;
    deleteMany(filter: any): Promise<{
        deletedCount?: number;
    }>;
}
