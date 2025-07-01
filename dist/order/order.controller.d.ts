import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("./order.schema").Order, {}> & import("./order.schema").Order & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
