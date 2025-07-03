import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsActiveGuard } from '../auth/is-active.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Get()
  async getCart(@Req() req) {
    console.log('[CartController.getCart] request.user:', req.user);
    const userId = req.user.userId;
    return this.cartService.getCartByUser(userId);
  }

  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Post('add')
  async addToCart(@Req() req, @Body() body) {
    console.log('[CartController.addToCart] request.user:', req.user);
    const userId = req.user.userId;
    const { productId, size, quantity } = body;
    return this.cartService.addToCart(userId, productId, size, quantity);
  }
  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Post('update')
  async updateItemQuantity(@Req() req, @Body() body) {
    console.log('[CartController.updateItemQuantity] request.user:', req.user);
    const userId = req.user.userId;
    const { productId, size, quantity } = body;
    return this.cartService.updateItemQuantity(
      userId,
      productId,
      size,
      quantity,
    );
  }
  @UseGuards(JwtAuthGuard, IsActiveGuard)
  @Post('remove')
  async removeFromCart(@Req() req, @Body() body) {
    console.log('[CartController.removeFromCart] request.user:', req.user);
    const userId = req.user.userId;
    const { productId, size } = body;
    return this.cartService.removeFromCart(userId, productId, size);
  }
}
