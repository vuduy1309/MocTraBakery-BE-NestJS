import { ICartRepository } from '../../domain/cart/cart.repository';
import { Types } from 'mongoose';
export declare class DeleteCartByUserUseCase {
    private cartRepo;
    constructor(cartRepo: ICartRepository);
    execute(userId: string | Types.ObjectId): Promise<any>;
}
