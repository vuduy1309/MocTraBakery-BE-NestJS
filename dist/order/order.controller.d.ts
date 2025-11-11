import { CreateOrderUseCase } from '../application/order/create-order.usecase';
import { FindOrderUseCase } from '../application/order/find-order.usecase';
import { ListOrdersUseCase } from '../application/order/list-orders.usecase';
import { MarkPaidUseCase } from '../application/order/mark-paid.usecase';
import { UpdateOrderStatusUseCase } from '../application/order/update-order-status.usecase';
import { CreateOrderDto } from './dto/create-order.dto';
import { IVnpayProvider } from '../domain/vnpay/vnpay.provider';
import { Request, Response } from 'express';
import { DeleteCartByUserUseCase } from '../application/cart/delete-cart-by-user.usecase';
export declare class OrderController {
    private readonly createOrderUseCase;
    private readonly findOrderUseCase;
    private readonly listOrdersUseCase;
    private readonly markPaidUseCase;
    private readonly updateOrderStatusUseCase;
    private readonly vnpayProvider;
    private readonly deleteCartByUserUseCase;
    constructor(createOrderUseCase: CreateOrderUseCase, findOrderUseCase: FindOrderUseCase, listOrdersUseCase: ListOrdersUseCase, markPaidUseCase: MarkPaidUseCase, updateOrderStatusUseCase: UpdateOrderStatusUseCase, vnpayProvider: IVnpayProvider, deleteCartByUserUseCase: DeleteCartByUserUseCase);
    getRecentOrders(req: any): Promise<{
        code: any;
        status: any;
        amount: any;
        createdAt: any;
    }[]>;
    getAllOrders(req: any, query: any): Promise<any[]>;
    create(createOrderDto: CreateOrderDto, req: any): Promise<any>;
    getVnpayUrl(orderId: string, req: Request): Promise<{
        url: any;
    }>;
    vnpayReturn(query: any, res: Response): Promise<void>;
    updateStatus(id: string, status: string): Promise<any>;
    getMyOrders(req: any): Promise<any[]>;
    getOrderDetail(id: string, req: any): Promise<any>;
    private getClientIp;
}
