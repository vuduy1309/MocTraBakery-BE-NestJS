import { Model } from 'mongoose';
import { Order } from './order.schema';
import { ProductService } from '../product/product.service';
export declare class OrderService {
    private orderModel;
    private productService;
    constructor(orderModel: Model<Order>, productService: ProductService);
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
