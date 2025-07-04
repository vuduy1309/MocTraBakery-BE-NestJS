import { Model } from 'mongoose';
import { Comment } from './comment.schema';
export declare class CommentService {
    private commentModel;
    constructor(commentModel: Model<Comment>);
    findAll(limit?: number): Promise<(import("mongoose").Document<unknown, {}, Comment, {}> & Comment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findByProduct(productId: string): Promise<(import("mongoose").Document<unknown, {}, Comment, {}> & Comment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    create(data: {
        productId: string;
        rating: number;
        content: string;
        author: string;
    }): Promise<import("mongoose").Document<unknown, {}, Comment, {}> & Comment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
