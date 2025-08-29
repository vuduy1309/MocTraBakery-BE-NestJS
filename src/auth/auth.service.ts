import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && await this.userService.comparePassword(pass, user.passwordHash)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const id = (user as any)._id || (user as any).id;
    const payload = {
      sub: id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      isActive: user.isActive,
    };
    const token = this.jwtService.sign(payload);
    console.log('[AuthService.login] user:', user);
    console.log('[AuthService.login] payload:', payload);
    console.log('[AuthService.login] access_token:', token);
    return {
      access_token: token,
      user: {
        _id: id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }
}
