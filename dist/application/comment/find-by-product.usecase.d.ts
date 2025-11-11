import { ICommentRepository } from '../../domain/comment/comment.repository';
export declare class FindByProductUseCase {
    private commentRepo;
    constructor(commentRepo: ICommentRepository);
    execute(productId: string): Promise<any[]>;
}
