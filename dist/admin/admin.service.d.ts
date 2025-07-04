import { Model } from 'mongoose';
import { Product } from '../product/product.schema';
import { Order } from '../order/order.schema';
import { User } from '../user/user.schema';
export declare class AdminService {
    private productModel;
    private orderModel;
    private userModel;
    constructor(productModel: Model<Product>, orderModel: Model<Order>, userModel: Model<User>);
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
