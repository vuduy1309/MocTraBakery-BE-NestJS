import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  author: string;

  @Prop({ type: String, required: true })
  productId: string;

  @Prop({ type: Number, min: 1, max: 5, required: true })
  rating: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
