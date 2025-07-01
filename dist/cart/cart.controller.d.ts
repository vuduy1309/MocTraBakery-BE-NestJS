import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<{
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
            priceAfterDiscount: number;
            discountPercent: number;
        }[];
        total: number;
    }>;
    addToCart(req: any, body: any): Promise<import("mongoose").Document<unknown, {}, import("./cart.schema").Cart, {}> & import("./cart.schema").Cart & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateItemQuantity(req: any, body: any): Promise<import("mongoose").Document<unknown, {}, import("./cart.schema").Cart, {}> & import("./cart.schema").Cart & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    removeFromCart(req: any, body: any): Promise<import("mongoose").UpdateWriteOpResult>;
}
