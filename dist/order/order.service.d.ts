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
    findById(orderId: string): Promise<(import("mongoose").Document<unknown, {}, Order, {}> & Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    markPaid(orderId: string): Promise<(import("mongoose").Document<unknown, {}, Order, {}> & Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    findAll(filter?: Record<string, any>, options?: Record<string, any>): Promise<(import("mongoose").Document<unknown, {}, Order, {}> & Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    updateStatus(orderId: string, status: string): Promise<(import("mongoose").Document<unknown, {}, Order, {}> & Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
