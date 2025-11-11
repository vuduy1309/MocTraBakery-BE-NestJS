import { IOrderRepository } from '../../domain/order/order.repository';
export declare class CreateOrderUseCase {
    private orderRepo;
    constructor(orderRepo: IOrderRepository);
    execute(createOrderDto: any, userId: string): Promise<any>;
}
