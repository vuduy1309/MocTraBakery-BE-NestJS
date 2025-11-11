import { IUserRepository } from '../../domain/user/user.repository';
export declare class ValidateUserUseCase {
    private readonly userRepo;
    constructor(userRepo: IUserRepository);
    execute(email: string, password: string): Promise<any>;
}
