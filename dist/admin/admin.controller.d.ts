import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getStats(): Promise<{
        totalProducts: number;
        totalOrders: number;
        totalCustomers: number;
        totalRevenue: number;
        bestSellers: any[];
        revenueByDay: {
            date: string;
            revenue: any;
        }[];
    }>;
}
