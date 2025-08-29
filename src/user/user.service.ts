import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    if (!userId) throw new BadRequestException('ID không hợp lệ');
    if (!Types.ObjectId.isValid(userId))
      throw new BadRequestException('ID không hợp lệ');
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('Không tìm thấy user');
    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) throw new BadRequestException('Mật khẩu cũ không đúng');
    if (oldPassword === newPassword)
      throw new BadRequestException('Mật khẩu mới phải khác mật khẩu cũ');
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();
    return true;
  }
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async updateProfile(
    userId: string,
    update: { fullName?: string; phone?: string; address?: string },
  ) {
    if (!userId) throw new BadRequestException('ID không hợp lệ');
    if (!Types.ObjectId.isValid(userId))
      throw new BadRequestException('ID không hợp lệ');
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $set: update },
        { new: true, select: 'email fullName phone address createdAt' },
      )
      .lean<Partial<User>>();
    if (!user) throw new BadRequestException('Không tìm thấy user');
    return user;
  }
  async getProfile(userId: string): Promise<Partial<User> | null> {
    if (!userId) throw new BadRequestException('ID không hợp lệ');
    // Chỉ lấy theo ObjectId hợp lệ (giống logic cart)
    if (!Types.ObjectId.isValid(userId))
      throw new BadRequestException('ID không hợp lệ');
    const user = await this.userModel
      .findById(userId)
      .select('email fullName role createdAt phone address')
      .lean<Partial<User>>();
    if (!user) throw new BadRequestException('Không tìm thấy user');
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async comparePassword(plain: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plain, hash);
  }

  async register(data: RegisterUserDto): Promise<User> {
    const existed = await this.userModel.findOne({ email: data.email });
    if (existed) {
      throw new BadRequestException('Email đã tồn tại trong hệ thống');
    }
    const passwordHash = await bcrypt.hash(data.password, 10);
    const { password, role, ...rest } = data;
    const createdUser = new this.userModel({
      ...rest,
      role: role ?? 'Customer',
      passwordHash,
      createdAt: new Date(),
    });
    return createdUser.save();
  }

  async lockUser(userId: string): Promise<any> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true },
    );
  }

  async unlockUser(userId: string): Promise<any> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { isActive: true },
      { new: true },
    );
  }

  async login(data: import('./dto/login-user.dto').LoginUserDto) {
    const user = await this.userModel.findOne({ email: data.email });
    if (!user) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng');
    }
    if (user.isActive === false) {
      throw new BadRequestException(
        'Tài khoản đã bị khoá. Vui lòng liên hệ quản trị viên.',
      );
    }
    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng');
    }
    const { passwordHash, ...userObj } = user.toObject();
    return userObj;
  }
}
