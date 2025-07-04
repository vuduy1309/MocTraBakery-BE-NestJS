import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    changePassword(req: any, body: {
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    constructor(userService: UserService, authService: AuthService);
    updateProfile(req: any, body: {
        fullName?: string;
        phone?: string;
        address?: string;
    }): Promise<Partial<import("./user.schema").User>>;
    getProfile(req: any): Promise<Partial<import("./user.schema").User> | null>;
    lockUser(id: string): Promise<any>;
    unlockUser(id: string): Promise<any>;
    getAllUsers(): Promise<(import("mongoose").FlattenMaps<import("./user.schema").UserDocument> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    })[]>;
    register(body: RegisterUserDto): Promise<import("./user.schema").User>;
    login(loginBody: LoginUserDto): Promise<{
        access_token: string;
        user: {
            _id: any;
            email: string;
            fullName: string;
            role: string;
            isActive: boolean;
        };
    }>;
}
