import { FindAllCommentsUseCase } from '../application/comment/find-all-comments.usecase';
import { FindByProductUseCase } from '../application/comment/find-by-product.usecase';
import { CreateCommentUseCase } from '../application/comment/create-comment.usecase';
export declare class CommentController {
    private readonly findAllCommentsUseCase;
    private readonly findByProductUseCase;
    private readonly createCommentUseCase;
    constructor(findAllCommentsUseCase: FindAllCommentsUseCase, findByProductUseCase: FindByProductUseCase, createCommentUseCase: CreateCommentUseCase);
    getAll(req: any): Promise<any[]>;
    createComment(req: any, body: {
        productId: string;
        rating: number;
        content: string;
    }): Promise<any>;
}
