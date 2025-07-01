import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  items: {
    productId: string;
    quantity: number;
    size?: string;
  }[];

  @IsNumber()
  total: number;

  @IsString()
  paymentMethod: string;
}
