import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ChangePasswordUseCase {
  constructor(@Inject('IUserRepository') private userRepo: IUserRepository) {}

  async execute(userId: string, oldPassword: string, newPassword: string) {
    if (!userId) throw new BadRequestException('Invalid user id');
    const user = await this.userRepo.findById(userId);
    if (!user) throw new BadRequestException('User not found');
    const isMatch = await this.userRepo.comparePassword(oldPassword, user.passwordHash);
    if (!isMatch) throw new BadRequestException('Old password is incorrect');
    if (oldPassword === newPassword) throw new BadRequestException('New password must differ');
    const newHash = await bcrypt.hash(newPassword, 10);
    await this.userRepo.updateById(userId, { passwordHash: newHash });
    return true;
  }
}
