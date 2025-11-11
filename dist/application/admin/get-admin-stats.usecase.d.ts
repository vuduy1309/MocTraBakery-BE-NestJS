import { IProductRepository } from '../../domain/product/product.repository';
import { IOrderRepository } from '../../domain/order/order.repository';
import { IUserRepository } from '../../domain/user/user.repository';
export declare class GetAdminStatsUseCase {
    private readonly productRepo;
    private readonly orderRepo;
    private readonly userRepo;
    constructor(productRepo: IProductRepository, orderRepo: IOrderRepository, userRepo: IUserRepository);
    execute(): Promise<{
        totalProducts: number;
        totalOrders: number;
        totalCustomers: number;
        totalRevenue: any;
        bestSellers: any[];
        revenueByDay: {
            date: string;
            revenue: any;
        }[];
    }>;
}
