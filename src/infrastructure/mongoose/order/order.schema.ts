import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({
    type: [
      {
        productId: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        size: { type: String },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        discountPercent: { type: Number },
        priceAfterDiscount: { type: Number },
      },
    ],
    required: true,
  })
  items: Array<{
    productId: Types.ObjectId;
    quantity: number;
    size?: string;
    name: string;
    price: number;
    discountPercent?: number;
    priceAfterDiscount?: number;
  }>;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  note?: string;

  @Prop({ required: true })
  deliveryTime: Date;

  @Prop({ default: 'pending' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
