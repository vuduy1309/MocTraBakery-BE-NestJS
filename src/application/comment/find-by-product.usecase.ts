import { Inject, Injectable } from '@nestjs/common';
import { ICommentRepository } from '../../domain/comment/comment.repository';

@Injectable()
export class FindByProductUseCase {
  constructor(@Inject('ICommentRepository') private commentRepo: ICommentRepository) {}

  async execute(productId: string) {
    return this.commentRepo.findByProduct(productId);
  }
}
