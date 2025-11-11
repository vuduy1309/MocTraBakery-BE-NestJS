import { GetCartByUserUseCase } from '../application/cart/get-cart-by-user.usecase';
import { AddToCartUseCase } from '../application/cart/add-to-cart.usecase';
import { UpdateItemQuantityUseCase } from '../application/cart/update-item-quantity.usecase';
import { RemoveFromCartUseCase } from '../application/cart/remove-from-cart.usecase';
export declare class CartController {
    private readonly getCartByUserUseCase;
    private readonly addToCartUseCase;
    private readonly updateItemQuantityUseCase;
    private readonly removeFromCartUseCase;
    constructor(getCartByUserUseCase: GetCartByUserUseCase, addToCartUseCase: AddToCartUseCase, updateItemQuantityUseCase: UpdateItemQuantityUseCase, removeFromCartUseCase: RemoveFromCartUseCase);
    getCart(req: any): Promise<{
        items: any;
        total: number;
    }>;
    addToCart(req: any, body: any): Promise<any>;
    updateItemQuantity(req: any, body: any): Promise<any>;
    removeFromCart(req: any, body: any): Promise<any>;
}
