import { Controller, Get, Post, Body, Req, UseGuards, Inject } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsActiveGuard } from '../auth/is-active.guard';
import { GetCartByUserUseCase } from '../application/cart/get-cart-by-user.usecase';
import { AddToCartUseCase } from '../application/cart/add-to-cart.usecase';
import { UpdateItemQuantityUseCase } from '../application/cart/update-item-quantity.usecase';
import { RemoveFromCartUseCase } from '../application/cart/remove-from-cart.usecase';

@Controller('cart')
export class CartController {
  constructor(
    private readonly getCartByUserUseCase: GetCartByUserUseCase,
    private readonly addToCartUseCase: AddToCartUseCase,
    private readonly updateItemQuantityUseCase: UpdateItemQuantityUseCase,
    private readonly removeFromCartUseCase: RemoveFromCartUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Get()
  async getCart(@Req() req) {
    console.log('[CartController.getCart] request.user:', req.user);
    const userId = req.user.userId;
  return this.getCartByUserUseCase.execute(userId);
  }

  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Post('add')
  async addToCart(@Req() req, @Body() body) {
    console.log('[CartController.addToCart] request.user:', req.user);
    const userId = req.user.userId;
    const { productId, size, quantity } = body;
  return this.addToCartUseCase.execute(userId, productId, size, quantity);
  }
  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Post('update')
  async updateItemQuantity(@Req() req, @Body() body) {
    console.log('[CartController.updateItemQuantity] request.user:', req.user);
    const userId = req.user.userId;
    const { productId, size, quantity } = body;
    return this.updateItemQuantityUseCase.execute(userId, productId, size, quantity);
  }
  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Post('remove')
  async removeFromCart(@Req() req, @Body() body) {
    console.log('[CartController.removeFromCart] request.user:', req.user);
    const userId = req.user.userId;
    const { productId, size } = body;
    return this.removeFromCartUseCase.execute(userId, productId, size);
  }
}
