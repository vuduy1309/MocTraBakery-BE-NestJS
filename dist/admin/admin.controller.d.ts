import { GetAdminStatsUseCase } from '../application/admin/get-admin-stats.usecase';
export declare class AdminController {
    private readonly getAdminStats;
    constructor(getAdminStats: GetAdminStatsUseCase);
    getStats(): Promise<{
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
