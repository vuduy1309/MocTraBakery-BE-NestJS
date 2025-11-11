import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class RegisterUserUseCase {
  constructor(@Inject('IUserRepository') private userRepo: IUserRepository) {}

  async execute(data: any) {
    const existed = await this.userRepo.findByEmail(data.email);
    if (existed) throw new Error('Email already exists');
    const passwordHash = await bcrypt.hash(data.password, 10);
    const { password, ...rest } = data;
    const created = await this.userRepo.create({ ...rest, passwordHash, role: data.role ?? 'Customer', createdAt: new Date() });
    return created;
  }
}
