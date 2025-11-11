import { IUserRepository } from '../../domain/user/user.repository';
export declare class GetProfileUseCase {
    private userRepo;
    constructor(userRepo: IUserRepository);
    execute(userId: string): Promise<any>;
}
