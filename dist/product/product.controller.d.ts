import { ProductService } from './product.service';
import { OrderService } from '../order/order.service';
import { UserService } from '../user/user.service';
export declare class ProductController {
    private readonly productService;
    private readonly orderService;
    private readonly userService;
    constructor(productService: ProductService, orderService: OrderService, userService: UserService);
    update(id: string, body: any): Promise<import("./product.schema").Product>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
    create(body: any): Promise<import("./product.schema").Product>;
    getDashboardStats(): Promise<{
        totalProducts: number;
        totalOrders: number;
        totalCustomers: number;
        totalRevenue: number;
        bestSellers: (import("mongoose").Document<unknown, {}, import("./product.schema").ProductDocument, {}> & import("./product.schema").Product & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    getAll(): Promise<{
        _id: any;
        name: any;
        description: any;
        price: any;
        images: any;
        stock: any;
        isActive: any;
        categoryId: any;
        discountId: any;
        createdBy: any;
        createdAt: any;
        shelfLifeDays: any;
        isRefrigerated: any;
        isVegetarian: any;
        calories: any;
        includedFlavors: any;
        packaging: any;
        sizes: any;
        origin: any;
    }[]>;
    getById(id: string): Promise<{
        _id: any;
        name: any;
        description: any;
        price: any;
        images: any;
        stock: any;
        isActive: any;
        categoryId: any;
        discountId: any;
        createdBy: any;
        createdAt: any;
        shelfLifeDays: any;
        isRefrigerated: any;
        isVegetarian: any;
        calories: any;
        includedFlavors: any;
        packaging: any;
        sizes: any;
        origin: any;
    }>;
}
