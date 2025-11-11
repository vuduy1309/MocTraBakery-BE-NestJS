import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop()
  stock: number;

  @Prop()
  isActive: boolean;

  @Prop({ type: String, default: '' })
  origin?: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Discount' })
  discountId?: Types.ObjectId;

  @Prop()
  createdBy: string;

  @Prop()
  createdAt: Date;

  @Prop()
  shelfLifeDays?: number;

  @Prop()
  isRefrigerated?: boolean;

  @Prop()
  isVegetarian?: boolean;

  @Prop()
  calories?: number;

  @Prop({ type: [String], default: [] })
  includedFlavors?: string[];

  @Prop({ type: Object })
  packaging?: any;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, default: 0 },
      },
    ],
    default: [],
  })
  sizes?: {
    name: string;
    price: number;
    stock: number;
  }[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.set('timestamps', true);
