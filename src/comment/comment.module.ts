import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from '../infrastructure/mongoose/comment/comment.schema';
import { MongooseCommentRepository } from '../infrastructure/mongoose/comment/comment.repository';
import { FindAllCommentsUseCase } from '../application/comment/find-all-comments.usecase';
import { FindByProductUseCase } from '../application/comment/find-by-product.usecase';
import { CreateCommentUseCase } from '../application/comment/create-comment.usecase';

import { CommentController } from './comment.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])],
  controllers: [CommentController],
  providers: [
    MongooseCommentRepository,
    { provide: 'ICommentRepository', useClass: MongooseCommentRepository },
    FindAllCommentsUseCase,
    FindByProductUseCase,
    CreateCommentUseCase,
  ],
  exports: [FindAllCommentsUseCase, FindByProductUseCase, CreateCommentUseCase],
})
export class CommentModule {}
