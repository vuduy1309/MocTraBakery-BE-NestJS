import { Model } from 'mongoose';
import { Order } from './order.schema';
export declare class OrderService {
    private orderModel;
    constructor(orderModel: Model<Order>);
    create(createOrderDto: any, userId: string): Promise<import("mongoose").Document<unknown, {}, Order, {}> & Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
