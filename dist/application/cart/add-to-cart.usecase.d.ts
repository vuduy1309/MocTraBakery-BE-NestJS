import { ICartRepository } from '../../domain/cart/cart.repository';
import { IProductRepository } from '../../domain/product/product.repository';
export declare class AddToCartUseCase {
    private cartRepo;
    private productRepo;
    constructor(cartRepo: ICartRepository, productRepo: IProductRepository);
    execute(userId: string, productId: string, size: string, quantity: number): Promise<any>;
}
