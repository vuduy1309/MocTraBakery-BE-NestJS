import { IUserRepository } from '../../domain/user/user.repository';
export declare class LockUnlockUserUseCase {
    private userRepo;
    constructor(userRepo: IUserRepository);
    lock(userId: string): Promise<any>;
    unlock(userId: string): Promise<any>;
}
