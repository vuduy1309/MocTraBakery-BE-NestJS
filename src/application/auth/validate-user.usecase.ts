import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/user.repository';

@Injectable()
export class ValidateUserUseCase {
  constructor(@Inject('IUserRepository') private readonly userRepo: IUserRepository) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) return null;
    const ok = await this.userRepo.comparePassword(password, user.passwordHash);
    if (!ok) return null;
    return user;
  }
}
