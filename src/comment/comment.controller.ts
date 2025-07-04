import { Controller, Get, Post, Body, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getAll(@Req() req) {
    // Lấy productId từ query
    const productId = req.query?.productId;
    if (productId) {
      return this.commentService.findByProduct(productId);
    }
    return this.commentService.findAll();
  }

  // API: POST /comments (thêm đánh giá sản phẩm)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(@Req() req, @Body() body: { productId: string; rating: number; content: string }) {
    const userId = req.user?.userId || req.user?.sub || req.user?._id;
    if (!userId) throw new BadRequestException('Không xác định user');
    if (!body.productId || !body.rating || !body.content) throw new BadRequestException('Thiếu thông tin');
    return this.commentService.create({
      productId: body.productId,
      rating: body.rating,
      content: body.content,
      author: userId,
    });
  }
}
