import { IOrderRepository } from '../../domain/order/order.repository';
export declare class FindOrderUseCase {
    private orderRepo;
    constructor(orderRepo: IOrderRepository);
    execute(id: string): Promise<any>;
}
