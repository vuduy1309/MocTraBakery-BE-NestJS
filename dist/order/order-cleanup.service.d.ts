import { OnModuleInit } from '@nestjs/common';
import { IOrderRepository } from '../domain/order/order.repository';
export declare class OrderCleanupService implements OnModuleInit {
    private readonly orderRepo;
    private readonly logger;
    private intervalId;
    constructor(orderRepo: IOrderRepository);
    onModuleInit(): void;
    cleanupPendingVnpayOrders(): Promise<void>;
}
