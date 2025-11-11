import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ValidateUserUseCase } from '../application/auth/validate-user.usecase';
import { LoginUseCase } from '../application/auth/login.usecase';
import { ChangePasswordUseCase } from '../application/user/change-password.usecase';
import { UpdateProfileUseCase } from '../application/user/update-profile.usecase';
import { GetProfileUseCase } from '../application/user/get-profile.usecase';
import { LockUnlockUserUseCase } from '../application/user/lock-unlock-user.usecase';
import { ListUsersUseCase } from '../application/user/list-users.usecase';
import { RegisterUserUseCase } from '../application/user/register-user.usecase';
import { IUserRepository } from '../domain/user/user.repository';
export declare class UserController {
    private readonly validateUserUseCase;
    private readonly loginUseCase;
    private readonly changePasswordUseCase;
    private readonly updateProfileUseCase;
    private readonly getProfileUseCase;
    private readonly lockUnlockUseCase;
    private readonly listUsersUseCase;
    private readonly registerUserUseCase;
    private readonly userRepository;
    changePassword(req: any, body: {
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    constructor(validateUserUseCase: ValidateUserUseCase, loginUseCase: LoginUseCase, changePasswordUseCase: ChangePasswordUseCase, updateProfileUseCase: UpdateProfileUseCase, getProfileUseCase: GetProfileUseCase, lockUnlockUseCase: LockUnlockUserUseCase, listUsersUseCase: ListUsersUseCase, registerUserUseCase: RegisterUserUseCase, userRepository: IUserRepository);
    updateProfile(req: any, body: {
        fullName?: string;
        phone?: string;
        address?: string;
    }): Promise<any>;
    getProfile(req: any): Promise<any>;
    lockUser(id: string): Promise<any>;
    unlockUser(id: string): Promise<any>;
    getAllUsers(): Promise<any[]>;
    register(body: RegisterUserDto): Promise<any>;
    login(loginBody: LoginUserDto): Promise<{
        access_token: string;
        user: {
            _id: any;
            email: any;
            fullName: any;
            role: any;
            isActive: any;
        };
    }>;
}
