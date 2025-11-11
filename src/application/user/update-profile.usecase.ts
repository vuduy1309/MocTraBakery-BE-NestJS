import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/user.repository';

@Injectable()
export class UpdateProfileUseCase {
  constructor(@Inject('IUserRepository') private userRepo: IUserRepository) {}

  async execute(userId: string, update: { fullName?: string; phone?: string; address?: string }) {
    if (!userId) throw new BadRequestException('Invalid user id');
    const user = await this.userRepo.updateById(userId, { $set: update });
    if (!user) throw new BadRequestException('User not found');
    return user;
  }
}
