import {
  Param,
  Patch,
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Patch('/change-password')
  async changePassword(
    @Req() req,
    @Body() body: { oldPassword: string; newPassword: string },
  ) {
    const userId = req.user?.userId || req.user?.sub || req.user?._id;
    if (!userId) throw new BadRequestException('Không xác định được user');
    if (!body.oldPassword || !body.newPassword)
      throw new BadRequestException('Thiếu thông tin');
    await this.userService.changePassword(
      userId,
      body.oldPassword,
      body.newPassword,
    );
    return { message: 'Đổi mật khẩu thành công' };
  }
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/profile')
  async updateProfile(
    @Req() req,
    @Body() body: { fullName?: string; phone?: string; address?: string },
  ) {
    const userId = req.user?.userId || req.user?.sub || req.user?._id;
    if (!userId) throw new BadRequestException('Không xác định được user');
    const update: Record<string, string> = {};
    if (typeof body.fullName === 'string' && body.fullName.trim() !== '')
      update.fullName = body.fullName.trim();
    if (typeof body.phone === 'string' && body.phone.trim() !== '')
      update.phone = body.phone.trim();
    if (typeof body.address === 'string' && body.address.trim() !== '')
      update.address = body.address.trim();
    if (Object.keys(update).length === 0)
      throw new BadRequestException('Không có dữ liệu cập nhật');
    const user = await this.userService.updateProfile(userId, update);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Req() req) {
    const userId = req.user.userId || req.user.sub || req.user._id;
    return this.userService.getProfile(userId);
  }

  @Patch(':id/lock')
  async lockUser(@Param('id') id: string) {
    const user = await this.userService.lockUser(id);
    return user;
  }
  @Patch(':id/unlock')
  async unlockUser(@Param('id') id: string) {
    const user = await this.userService.unlockUser(id);
    return user;
  }
  @Get()
  async getAllUsers() {
    const users = await this.userService['userModel']
      .find(
        {},
        {
          email: 1,
          fullName: 1,
          role: 1,
          phone: 1,
          address: 1,
          createdAt: 1,
          isActive: 1,
        },
      )
      .lean();
    return users;
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async register(@Body() body: RegisterUserDto) {
    return this.userService.register(body);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() loginBody: LoginUserDto) {
    let user: any;
    try {
      user = await this.userService.login(loginBody);
    } catch (err) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng');
    }
    return this.authService.login(user);
  }
}
