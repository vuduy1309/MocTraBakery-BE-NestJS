import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { IUserRepository } from '../../../domain/user/user.repository';
export declare class MongooseUserRepository implements IUserRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    countDocuments(filter?: any): Promise<number>;
    findByEmail(email: string): Promise<any | null>;
    comparePassword(plain: string, hash: string): Promise<boolean>;
    create(data: any): Promise<any>;
    findById(id: string): Promise<any | null>;
    find(filter?: any, projection?: any): Promise<any[]>;
    updateById(id: string, update: any, opts?: any): Promise<any | null>;
}
