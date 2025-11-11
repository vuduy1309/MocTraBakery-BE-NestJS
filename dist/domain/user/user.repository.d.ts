export interface IUserRepository {
    countDocuments(filter?: any): Promise<number>;
    findByEmail(email: string): Promise<any | null>;
    comparePassword(plain: string, hash: string): Promise<boolean>;
    create(data: any): Promise<any>;
    findById(id: string): Promise<any | null>;
    find(filter?: any, projection?: any): Promise<any[]>;
    updateById(id: string, update: any, opts?: any): Promise<any | null>;
}
