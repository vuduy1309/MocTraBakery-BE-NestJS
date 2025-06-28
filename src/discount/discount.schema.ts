import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Discount extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  percent: number;

  @Prop()
  description?: string;

  @Prop()
  active?: boolean;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
