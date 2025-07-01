import { Model } from 'mongoose';
import { Cart } from './cart.schema';
import { ProductService } from '../product/product.service';
export declare class CartService {
    private cartModel;
    private readonly productService;
    constructor(cartModel: Model<Cart>, productService: ProductService);
    getCartByUser(userId: string): Promise<{
        items: {
            productId: {
                _id: any;
                name: any;
                images: any;
                image: any;
                description: any;
                price: any;
                sizes: any;
                origin: any;
                isVegetarian: any;
                isRefrigerated: any;
                calories: any;
                category: any;
                discount: any;
            } | null;
            size: string | undefined;
            quantity: number;
            price: number;
        }[];
        total: number;
    }>;
    updateItemQuantity(userId: string, productId: string, size: string, quantity: number): Promise<import("mongoose").Document<unknown, {}, Cart, {}> & Cart & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    addToCart(userId: string, productId: string, size: string, quantity: number): Promise<import("mongoose").Document<unknown, {}, Cart, {}> & Cart & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    removeFromCart(userId: string, productId: string, size: string): Promise<import("mongoose").UpdateWriteOpResult>;
}
