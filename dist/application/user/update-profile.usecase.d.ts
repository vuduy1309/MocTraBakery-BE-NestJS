import { IUserRepository } from '../../domain/user/user.repository';
export declare class UpdateProfileUseCase {
    private userRepo;
    constructor(userRepo: IUserRepository);
    execute(userId: string, update: {
        fullName?: string;
        phone?: string;
        address?: string;
    }): Promise<any>;
}
