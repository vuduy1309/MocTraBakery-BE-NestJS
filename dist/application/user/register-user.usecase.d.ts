import { IUserRepository } from '../../domain/user/user.repository';
export declare class RegisterUserUseCase {
    private userRepo;
    constructor(userRepo: IUserRepository);
    execute(data: any): Promise<any>;
}
