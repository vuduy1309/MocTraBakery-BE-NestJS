import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.schema';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}


  async findAll(limit = 5) {
    return this.commentModel.find().sort({ createdAt: -1 }).limit(limit).exec();
  }

  async findByProduct(productId: string) {
    return this.commentModel.find({ productId }).sort({ createdAt: -1 }).exec();
  }

  async create(data: { productId: string; rating: number; content: string; author: string }) {
    const comment = new this.commentModel(data);
    return comment.save();
  }
}
