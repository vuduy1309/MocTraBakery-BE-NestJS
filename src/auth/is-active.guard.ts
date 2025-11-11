import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../domain/user/user.repository';

@Injectable()
export class IsActiveGuard implements CanActivate {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.userId) {
      console.log('[IsActiveGuard] Không có user trong request');
      return false;
    }
    // Check user active flag via repository
    try {
      const u = await this.userRepository.findById(user.userId);
      if (!u) return false;
      if (u.isActive === false) throw new ForbiddenException('User is not active');
      return true;
    } catch (err) {
      console.error('[IsActiveGuard] error checking user active', err);
      throw err;
    }
  }
}
