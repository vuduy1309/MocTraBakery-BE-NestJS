

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {

  // Đổi mật khẩu user
  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    if (!userId) throw new BadRequestException('ID không hợp lệ');
    if (!Types.ObjectId.isValid(userId)) throw new BadRequestException('ID không hợp lệ');
    const user = await this.userModel.findById(userId);
    if (!user) throw new BadRequestException('Không tìm thấy user');
    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) throw new BadRequestException('Mật khẩu cũ không đúng');
    if (oldPassword === newPassword) throw new BadRequestException('Mật khẩu mới phải khác mật khẩu cũ');
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();
    return true;
  }
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Cập nhật thông tin user hiện tại
  async updateProfile(userId: string, update: { fullName?: string; phone?: string; address?: string }) {
    if (!userId) throw new BadRequestException('ID không hợp lệ');
    if (!Types.ObjectId.isValid(userId)) throw new BadRequestException('ID không hợp lệ');
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $set: update },
      { new: true, select: 'email fullName phone address createdAt' }
    ).lean<Partial<User>>();
    if (!user) throw new BadRequestException('Không tìm thấy user');
    return user;
  }
  // Lấy profile user theo id
  async getProfile(userId: string): Promise<Partial<User> | null> {
    if (!userId) throw new BadRequestException('ID không hợp lệ');
    // Chỉ lấy theo ObjectId hợp lệ (giống logic cart)
    if (!Types.ObjectId.isValid(userId)) throw new BadRequestException('ID không hợp lệ');
    const user = await this.userModel.findById(userId).select('email fullName role createdAt phone address').lean<Partial<User>>();
    if (!user) throw new BadRequestException('Không tìm thấy user');
    return user;
  }

  // Tìm user theo email
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  // So sánh mật khẩu
  async comparePassword(plain: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plain, hash);
  }

  // Hàm đăng ký user mới, nhận vào DTO đã validate
  async register(data: RegisterUserDto): Promise<User> {
    // Kiểm tra email đã tồn tại chưa
    const existed = await this.userModel.findOne({ email: data.email });
    if (existed) {
      throw new BadRequestException('Email đã tồn tại trong hệ thống');
    }
    // Hash mật khẩu trước khi lưu
    const passwordHash = await bcrypt.hash(data.password, 10);
    // Nếu không truyền role thì mặc định là 'Customer'
    const { password, role, ...rest } = data;
    const createdUser = new this.userModel({
      ...rest,
      role: role ?? 'Customer',
      passwordHash,
      createdAt: new Date(),
    });
    return createdUser.save(); // Lưu vào database
  }

  // Khoá tài khoản user (set isActive = false)
  async lockUser(userId: string): Promise<any> {
    return this.userModel.findByIdAndUpdate(userId, { isActive: false }, { new: true });
  }

  // Mở khoá tài khoản user (set isActive = true)
  async unlockUser(userId: string): Promise<any> {
    return this.userModel.findByIdAndUpdate(userId, { isActive: true }, { new: true });
  }

  // Hàm đăng nhập user
  async login(data: import('./dto/login-user.dto').LoginUserDto) {
    // Tìm user theo email
    const user = await this.userModel.findOne({ email: data.email });
    if (!user) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng');
    }
    // Kiểm tra tài khoản có bị khoá không
    if (user.isActive === false) {
      throw new BadRequestException('Tài khoản đã bị khoá. Vui lòng liên hệ quản trị viên.');
    }
    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng');
    }
    // Trả về user (ẩn passwordHash) bằng destructuring
    const { passwordHash, ...userObj } = user.toObject();
    return userObj;
  }
}
