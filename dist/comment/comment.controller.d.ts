import { CommentService } from './comment.service';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    getAll(): Promise<(import("mongoose").Document<unknown, {}, import("./comment.schema").Comment, {}> & import("./comment.schema").Comment & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
