import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from '../infrastructure/mongoose/cart/cart.schema';
import { CartController } from './cart.controller';
import { MongooseCartRepository } from '../infrastructure/mongoose/cart/cart.repository';
import { GetCartByUserUseCase } from '../application/cart/get-cart-by-user.usecase';
import { AddToCartUseCase } from '../application/cart/add-to-cart.usecase';
import { UpdateItemQuantityUseCase } from '../application/cart/update-item-quantity.usecase';
import { RemoveFromCartUseCase } from '../application/cart/remove-from-cart.usecase';
import { DeleteCartByUserUseCase } from '../application/cart/delete-cart-by-user.usecase';
import { forwardRef } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    forwardRef(() => ProductModule),
    forwardRef(() => UserModule),
  ],
  providers: [
    MongooseCartRepository,
    { provide: 'ICartRepository', useClass: MongooseCartRepository },
    GetCartByUserUseCase,
    AddToCartUseCase,
    UpdateItemQuantityUseCase,
    RemoveFromCartUseCase,
    DeleteCartByUserUseCase,
  ],
  controllers: [CartController],
  exports: [
    { provide: 'ICartRepository', useClass: MongooseCartRepository },
    GetCartByUserUseCase,
    AddToCartUseCase,
    UpdateItemQuantityUseCase,
    RemoveFromCartUseCase,
    DeleteCartByUserUseCase,
  ],
})
export class CartModule {}
