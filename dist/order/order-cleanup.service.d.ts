import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { Order } from './order.schema';
export declare class OrderCleanupService implements OnModuleInit {
    private orderModel;
    private readonly logger;
    private intervalId;
    constructor(orderModel: Model<Order>);
    onModuleInit(): void;
    cleanupPendingVnpayOrders(): Promise<void>;
}
