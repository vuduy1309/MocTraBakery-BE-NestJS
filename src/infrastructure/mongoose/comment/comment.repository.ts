import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.schema';
import { ICommentRepository } from '../../../domain/comment/comment.repository';

@Injectable()
export class MongooseCommentRepository implements ICommentRepository {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async findAll(limit = 5): Promise<any[]> {
    return this.commentModel.find().sort({ createdAt: -1 }).limit(limit).exec();
  }

  async findByProduct(productId: string): Promise<any[]> {
    return this.commentModel.find({ productId }).sort({ createdAt: -1 }).exec();
  }

  async create(data: any): Promise<any> {
    const c = new this.commentModel(data);
    return c.save();
  }
}
