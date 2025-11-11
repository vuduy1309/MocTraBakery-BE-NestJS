import { ICartRepository } from '../../domain/cart/cart.repository';
export declare class UpdateItemQuantityUseCase {
    private cartRepo;
    constructor(cartRepo: ICartRepository);
    execute(userId: string, productId: string, size: string, quantity: number): Promise<any>;
}
