import { Model } from 'mongoose';
import { Comment } from './comment.schema';
import { ICommentRepository } from '../../../domain/comment/comment.repository';
export declare class MongooseCommentRepository implements ICommentRepository {
    private commentModel;
    constructor(commentModel: Model<Comment>);
    findAll(limit?: number): Promise<any[]>;
    findByProduct(productId: string): Promise<any[]>;
    create(data: any): Promise<any>;
}
