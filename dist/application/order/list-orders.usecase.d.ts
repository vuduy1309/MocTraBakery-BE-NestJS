import { IOrderRepository } from '../../domain/order/order.repository';
export declare class ListOrdersUseCase {
    private orderRepo;
    constructor(orderRepo: IOrderRepository);
    execute(filter?: Record<string, any>, options?: Record<string, any>): Promise<any[]>;
}
