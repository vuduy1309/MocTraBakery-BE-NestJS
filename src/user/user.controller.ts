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
// UserService removed — controller uses IUserRepository and use-cases directly
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ValidateUserUseCase } from '../application/auth/validate-user.usecase';
import { LoginUseCase } from '../application/auth/login.usecase';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChangePasswordUseCase } from '../application/user/change-password.usecase';
import { UpdateProfileUseCase } from '../application/user/update-profile.usecase';
import { GetProfileUseCase } from '../application/user/get-profile.usecase';
import { LockUnlockUserUseCase } from '../application/user/lock-unlock-user.usecase';
import { ListUsersUseCase } from '../application/user/list-users.usecase';
import { RegisterUserUseCase } from '../application/user/register-user.usecase';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '../domain/user/user.repository';

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
    await this.changePasswordUseCase.execute(
      userId,
      body.oldPassword,
      body.newPassword,
    );
    return { message: 'Đổi mật khẩu thành công' };
  }
  constructor(
    private readonly validateUserUseCase: ValidateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly lockUnlockUseCase: LockUnlockUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
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
    const user = await this.updateProfileUseCase.execute(userId, update);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Req() req) {
    const userId = req.user.userId || req.user.sub || req.user._id;
    return this.getProfileUseCase.execute(userId);
  }

  @Patch(':id/lock')
  async lockUser(@Param('id') id: string) {
    const user = await this.lockUnlockUseCase.lock(id);
    return user;
  }
  @Patch(':id/unlock')
  async unlockUser(@Param('id') id: string) {
    const user = await this.lockUnlockUseCase.unlock(id);
    return user;
  }
  @Get()
  async getAllUsers() {
    return this.listUsersUseCase.execute();
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async register(@Body() body: RegisterUserDto) {
    return this.registerUserUseCase.execute(body);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() loginBody: LoginUserDto) {
    let user: any;
    try {
      // perform login via repository directly
      const found = await this.userRepository.findByEmail(loginBody.email);
      if (!found) throw new Error('Invalid credentials');
      const ok = await this.userRepository.comparePassword(
        loginBody.password,
        found.passwordHash,
      );
      if (!ok) throw new Error('Invalid credentials');
      user = found;
    } catch (err) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng');
    }
    return this.loginUseCase.execute(user);
  }
}
