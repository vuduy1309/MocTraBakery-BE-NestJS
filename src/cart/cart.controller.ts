
import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCart(@Req() req) {
    const userId = req.user.userId;
    return this.cartService.getCartByUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addToCart(@Req() req, @Body() body) {
    const userId = req.user.userId;
    const { productId, size, quantity } = body;
    return this.cartService.addToCart(userId, productId, size, quantity);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('remove')
  async removeFromCart(@Req() req, @Body() body) {
    const userId = req.user.userId;
    const { productId, size } = body;
    return this.cartService.removeFromCart(userId, productId, size);
  }
}
