import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/user.repository';

@Injectable()
export class LockUnlockUserUseCase {
  constructor(@Inject('IUserRepository') private userRepo: IUserRepository) {}

  async lock(userId: string) {
    return this.userRepo.updateById(userId, { isActive: false });
  }

  async unlock(userId: string) {
    return this.userRepo.updateById(userId, { isActive: true });
  }
}
