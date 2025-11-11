import { Controller, Get, Post, Body, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FindAllCommentsUseCase } from '../application/comment/find-all-comments.usecase';
import { FindByProductUseCase } from '../application/comment/find-by-product.usecase';
import { CreateCommentUseCase } from '../application/comment/create-comment.usecase';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly findAllCommentsUseCase: FindAllCommentsUseCase,
    private readonly findByProductUseCase: FindByProductUseCase,
    private readonly createCommentUseCase: CreateCommentUseCase,
  ) {}

  @Get()
  async getAll(@Req() req) {
    const productId = req.query?.productId;
    if (productId) {
      return this.findByProductUseCase.execute(productId);
    }
    const limit = req.query?.limit ? parseInt(req.query.limit) : undefined;
    return this.findAllCommentsUseCase.execute(limit);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(@Req() req, @Body() body: { productId: string; rating: number; content: string }) {
    const userId = req.user?.userId || req.user?.sub || req.user?._id;
    if (!userId) throw new BadRequestException('Không xác định user');
    return this.createCommentUseCase.execute(userId, body);
  }
}
