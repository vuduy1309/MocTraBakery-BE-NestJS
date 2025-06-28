// Controller xử lý các route liên quan đến User
import { Body, Controller, Post, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
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
