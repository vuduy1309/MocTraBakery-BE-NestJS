import { ICartRepository } from '../../domain/cart/cart.repository';
export declare class GetCartByUserUseCase {
    private cartRepo;
    constructor(cartRepo: ICartRepository);
    execute(userId: string): Promise<{
        items: any;
        total: number;
    }>;
}
