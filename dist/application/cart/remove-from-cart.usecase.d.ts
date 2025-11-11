import { ICartRepository } from '../../domain/cart/cart.repository';
export declare class RemoveFromCartUseCase {
    private cartRepo;
    constructor(cartRepo: ICartRepository);
    execute(userId: string, productId: string, size: string): Promise<any>;
}
