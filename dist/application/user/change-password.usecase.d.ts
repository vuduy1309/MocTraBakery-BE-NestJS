import { IUserRepository } from '../../domain/user/user.repository';
export declare class ChangePasswordUseCase {
    private userRepo;
    constructor(userRepo: IUserRepository);
    execute(userId: string, oldPassword: string, newPassword: string): Promise<boolean>;
}
