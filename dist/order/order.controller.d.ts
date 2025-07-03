import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { VnpayService } from './vnpay.service';
import { Request, Response } from 'express';
import { CartService } from '../cart/cart.service';
export declare class OrderController {
    private readonly orderService;
    private readonly vnpayService;
    private readonly cartService;
    constructor(orderService: OrderService, vnpayService: VnpayService, cartService: CartService);
    getRecentOrders(req: any): Promise<{
        code: any;
        status: any;
        amount: any;
        createdAt: any;
    }[]>;
    getAllOrders(req: any, query: any): Promise<(import("mongoose").Document<unknown, {}, import("./order.schema").Order, {}> & import("./order.schema").Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    create(createOrderDto: CreateOrderDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("./order.schema").Order, {}> & import("./order.schema").Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getVnpayUrl(orderId: string, req: Request): Promise<{
        url: any;
    }>;
    vnpayReturn(query: any, res: Response): Promise<void>;
    updateStatus(id: string, status: string): Promise<(import("mongoose").Document<unknown, {}, import("./order.schema").Order, {}> & import("./order.schema").Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | {
        error: string;
    } | null>;
    getMyOrders(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./order.schema").Order, {}> & import("./order.schema").Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getOrderDetail(id: string, req: any): Promise<(import("mongoose").Document<unknown, {}, import("./order.schema").Order, {}> & import("./order.schema").Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | {
        error: string;
    }>;
    private getClientIp;
}
