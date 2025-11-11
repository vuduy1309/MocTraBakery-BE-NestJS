import { IUserRepository } from '../../domain/user/user.repository';
export declare class ListUsersUseCase {
    private userRepo;
    constructor(userRepo: IUserRepository);
    execute(): Promise<any[]>;
}
