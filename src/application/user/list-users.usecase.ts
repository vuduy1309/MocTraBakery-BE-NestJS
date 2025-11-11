import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/user.repository';

@Injectable()
export class ListUsersUseCase {
  constructor(@Inject('IUserRepository') private userRepo: IUserRepository) {}

  async execute() {
    return this.userRepo.find({}, { email: 1, fullName: 1, role: 1, phone: 1, address: 1, createdAt: 1, isActive: 1 });
  }
}
