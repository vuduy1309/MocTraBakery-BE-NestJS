export interface IProductRepository {
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any | null>;
    remove(id: string): Promise<any | null>;
    findAll(): Promise<any[]>;
    findById(id: string): Promise<any | null>;
    find(filter: any, projection?: any): Promise<any[]>;
    updateMany(ids: string[], update: any): Promise<any>;
    updateManyByFilter(filter: any, update: any): Promise<any>;
    countDocuments(): Promise<number>;
    findBestSellers(limit: number): Promise<any[]>;
}
