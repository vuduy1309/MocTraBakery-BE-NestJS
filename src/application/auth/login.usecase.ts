import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(user: any) {
    const id = (user as any)._id || (user as any).id;
    const payload = {
      sub: id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      isActive: user.isActive,
    };
    const token = this.jwtService.sign(payload);
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
