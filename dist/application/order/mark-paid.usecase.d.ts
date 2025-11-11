import { IOrderRepository } from '../../domain/order/order.repository';
import { IProductRepository } from '../../domain/product/product.repository';
export declare class MarkPaidUseCase {
    private orderRepo;
    private productRepo;
    constructor(orderRepo: IOrderRepository, productRepo: IProductRepository);
    execute(orderId: string): Promise<any>;
}
