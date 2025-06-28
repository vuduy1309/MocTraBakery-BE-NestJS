import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
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
        recentOrders: never[];
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
    }>;
}
