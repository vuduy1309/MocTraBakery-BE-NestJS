import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/user.repository';

@Injectable()
export class GetProfileUseCase {
  constructor(@Inject('IUserRepository') private userRepo: IUserRepository) {}

  async execute(userId: string) {
    return this.userRepo.findById(userId);
  }
}
