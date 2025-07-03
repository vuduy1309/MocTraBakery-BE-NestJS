import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    lockUser(id: string): Promise<any>;
    unlockUser(id: string): Promise<any>;
    getAllUsers(): Promise<(import("mongoose").FlattenMaps<import("./user.schema").UserDocument> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    })[]>;
    register(body: RegisterUserDto): Promise<import("./user.schema").User>;
    login(body: LoginUserDto): Promise<{
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
