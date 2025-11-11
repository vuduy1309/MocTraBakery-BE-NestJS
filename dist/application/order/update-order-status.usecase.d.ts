import { IOrderRepository } from '../../domain/order/order.repository';
export declare class UpdateOrderStatusUseCase {
    private orderRepo;
    constructor(orderRepo: IOrderRepository);
    execute(orderId: string, status: string): Promise<any>;
}
