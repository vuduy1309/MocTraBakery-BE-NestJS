import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: [{
    productId: { type: Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    size: { type: String },
  }], required: true })
  items: Array<{ productId: Types.ObjectId; quantity: number; size?: string }>;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
