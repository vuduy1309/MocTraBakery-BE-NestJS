declare function findByEmail(this: UserService, email: string): Promise<UserDocument | null>;
declare function comparePassword(plain: string, hash: string): Promise<boolean>;
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findByEmail: typeof findByEmail;
    comparePassword: typeof comparePassword;
    register(data: RegisterUserDto): Promise<User>;
    lockUser(userId: string): Promise<any>;
    unlockUser(userId: string): Promise<any>;
    login(data: import('./dto/login-user.dto').LoginUserDto): Promise<{
        fullName: string;
        email: string;
        role: string;
        phone: string;
        address: string;
        avatarUrl: string;
        createdAt: Date;
        isActive: boolean;
        _id: unknown;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }>;
}
export {};
