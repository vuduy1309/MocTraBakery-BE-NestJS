import { Model, Types } from 'mongoose';
import { Cart } from './cart.schema';
import { ProductService } from '../product/product.service';
export declare class CartService {
    private cartModel;
    private readonly productService;
    constructor(cartModel: Model<Cart>, productService: ProductService);
    getCartByUser(userId: string): Promise<{
        items: never[];
        total: number;
    } | {
        total: number;
        userId: Types.ObjectId;
        items: {
            productId: Types.ObjectId;
            size?: string;
            quantity: number;
            price: number;
        }[];
        _id: unknown;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }>;
    addToCart(userId: string, productId: string, size: string, quantity: number): Promise<import("mongoose").Document<unknown, {}, Cart, {}> & Cart & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    removeFromCart(userId: string, productId: string, size: string): Promise<import("mongoose").UpdateWriteOpResult>;
}
