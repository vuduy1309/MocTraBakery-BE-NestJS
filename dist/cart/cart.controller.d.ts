import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<{
        items: never[];
        total: number;
    } | {
        total: number;
        userId: import("mongoose").Types.ObjectId;
        items: {
            productId: import("mongoose").Types.ObjectId;
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
    addToCart(req: any, body: any): Promise<import("mongoose").Document<unknown, {}, import("./cart.schema").Cart, {}> & import("./cart.schema").Cart & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    removeFromCart(req: any, body: any): Promise<import("mongoose").UpdateWriteOpResult>;
}
