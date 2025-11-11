import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { IsActiveGuard } from './is-active.guard';
import { ValidateUserUseCase } from '../application/auth/validate-user.usecase';
import { LoginUseCase } from '../application/auth/login.usecase';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'duyha123',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [ValidateUserUseCase, LoginUseCase, JwtStrategy, IsActiveGuard],
  exports: [ValidateUserUseCase, LoginUseCase],
})
export class AuthModule {}
