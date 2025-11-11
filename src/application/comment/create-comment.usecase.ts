import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ICommentRepository } from '../../domain/comment/comment.repository';

@Injectable()
export class CreateCommentUseCase {
  constructor(@Inject('ICommentRepository') private commentRepo: ICommentRepository) {}

  async execute(author: string, data: { productId: string; rating: number; content: string }) {
    if (!author) throw new BadRequestException('Unauthenticated');
    if (!data.productId || !data.rating || !data.content) throw new BadRequestException('Missing fields');
    return this.commentRepo.create({ ...data, author });
  }
}
