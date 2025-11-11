import { ICommentRepository } from '../../domain/comment/comment.repository';
export declare class CreateCommentUseCase {
    private commentRepo;
    constructor(commentRepo: ICommentRepository);
    execute(author: string, data: {
        productId: string;
        rating: number;
        content: string;
    }): Promise<any>;
}
