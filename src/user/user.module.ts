// Module User để import vào AppModule
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../infrastructure/mongoose/user/user.schema';
// UserService removed; module exposes IUserRepository and use-cases
import { UserController } from './user.controller';
import { MongooseUserRepository } from '../infrastructure/mongoose/user/user.repository';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  providers: [
    MongooseUserRepository,
    { provide: 'IUserRepository', useClass: MongooseUserRepository },
    // user use-cases
    require('../application/user/register-user.usecase').RegisterUserUseCase,
    require('../application/user/change-password.usecase')
      .ChangePasswordUseCase,
    require('../application/user/update-profile.usecase').UpdateProfileUseCase,
    require('../application/user/get-profile.usecase').GetProfileUseCase,
    require('../application/user/lock-unlock-user.usecase')
      .LockUnlockUserUseCase,
    require('../application/user/list-users.usecase').ListUsersUseCase,
  ],
  controllers: [UserController],
  exports: [
    { provide: 'IUserRepository', useClass: MongooseUserRepository },
    // export use-cases for other modules if needed
    require('../application/user/register-user.usecase').RegisterUserUseCase,
    require('../application/user/change-password.usecase')
      .ChangePasswordUseCase,
    require('../application/user/update-profile.usecase').UpdateProfileUseCase,
    require('../application/user/get-profile.usecase').GetProfileUseCase,
    require('../application/user/lock-unlock-user.usecase')
      .LockUnlockUserUseCase,
    require('../application/user/list-users.usecase').ListUsersUseCase,
  ],
})
export class UserModule {}
