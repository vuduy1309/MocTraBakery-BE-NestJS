import { Inject, Injectable } from '@nestjs/common';
import { ICommentRepository } from '../../domain/comment/comment.repository';

@Injectable()
export class FindAllCommentsUseCase {
  constructor(@Inject('ICommentRepository') private commentRepo: ICommentRepository) {}

  async execute(limit = 5) {
    return this.commentRepo.findAll(limit);
  }
}
