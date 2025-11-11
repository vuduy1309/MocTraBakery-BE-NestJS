import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  items: {
    productId: string;
    quantity: number;
    size?: string;
    name: string;
    price: number;
    discountPercent?: number;
    priceAfterDiscount?: number;
  }[];

  @IsNumber()
  total: number;

  @IsString()
  paymentMethod: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  note?: string;

  @IsDateString()
  deliveryTime: string;
}
