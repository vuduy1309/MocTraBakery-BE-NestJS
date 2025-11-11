import { PipelineStage } from 'mongoose';
export interface IOrderRepository {
    countDocuments(filter?: any): Promise<number>;
    find(filter: any, projection?: any): Promise<any[]>;
    aggregate(pipeline: PipelineStage[]): Promise<any[]>;
    create(data: any): Promise<any>;
    findById(id: string): Promise<any | null>;
    findByIdAndUpdate(id: string, update: any, opts?: any): Promise<any | null>;
    findByIdAndDelete(id: string): Promise<any | null>;
    deleteMany(filter: any): Promise<{
        deletedCount?: number;
    }>;
}
