import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'duyha123',
    });
  }

  async validate(payload: any) {
    // Trả về đầy đủ thông tin user từ payload nếu có
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      fullName: payload.fullName,
      isActive: payload.isActive,
    };
  }
}
