import { CommentService } from './comment.service';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    getAll(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./comment.schema").Comment, {}> & import("./comment.schema").Comment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createComment(req: any, body: {
        productId: string;
        rating: number;
        content: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./comment.schema").Comment, {}> & import("./comment.schema").Comment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
