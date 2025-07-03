import { Param, Patch, Body, Controller, Post, Get, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';


// Controller xử lý các route liên quan đến User

import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('users') // Định nghĩa route gốc là /users
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  
  // API: PATCH /users/:id/lock (khoá tài khoản user)
  @Patch(':id/lock')
  async lockUser(@Param('id') id: string) {
    const user = await this.userService.lockUser(id);
    return user;
  }
  // API: PATCH /users/:id/unlock (mở khoá tài khoản user)
  @Patch(':id/unlock')
  async unlockUser(@Param('id') id: string) {
    const user = await this.userService.unlockUser(id);
    return user;
  }
  // API: GET /users (lấy danh sách user, trả về đầy đủ thông tin)
  @Get()
  async getAllUsers() {
    // Lấy tất cả user, trả về các trường: _id, email, fullName, role, phone, address, createdAt, isActive
    const users = await this.userService['userModel'].find({}, {
      email: 1,
      fullName: 1,
      role: 1,
      phone: 1,
      address: 1,
      createdAt: 1,
      isActive: 1,
    }).lean();
    return users;
  }

  // API đăng ký user mới: POST /users/register
  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // Kích hoạt validate tự động
  async register(@Body() body: RegisterUserDto) {
    // Gọi service để xử lý đăng ký
    return this.userService.register(body);
  }

  // API đăng nhập user: POST /users/login
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() body: LoginUserDto) {
    // Validate user
    // Sử dụng hàm login của UserService để validate
    let user: any;
    try {
      user = await this.userService.login(body);
    } catch (err) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng');
    }
    // Trả về access_token qua AuthService
    return this.authService.login(user);
  }
}
