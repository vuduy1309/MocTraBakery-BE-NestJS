import { ICommentRepository } from '../../domain/comment/comment.repository';
export declare class FindAllCommentsUseCase {
    private commentRepo;
    constructor(commentRepo: ICommentRepository);
    execute(limit?: number): Promise<any[]>;
}
