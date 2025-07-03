import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class IsActiveGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // Nếu user chưa xác thực thì bỏ qua (để JwtAuthGuard xử lý)
    if (!user || !user.userId) {
      console.log('[IsActiveGuard] Không có user trong request');
      return false;
    }
    // Log thông tin user
    console.log('[IsActiveGuard] user:', user);
    // const dbUser = await this.userService.findByEmail(user.email);
    // console.log('[IsActiveGuard] dbUser:', dbUser);
    // if (!dbUser || dbUser.isActive === false) {
    //   console.log('[IsActiveGuard] Chặn truy cập vì user bị khoá hoặc không tồn tại');
    //   throw new ForbiddenException('Tài khoản đã bị khoá. Vui lòng liên hệ quản trị viên.');
    // }
    return true;
  }
}
