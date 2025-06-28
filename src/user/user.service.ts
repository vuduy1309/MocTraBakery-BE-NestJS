
// Tìm user theo email
function findByEmail(this: UserService, email: string): Promise<UserDocument | null> {
  // @ts-ignore
  return this['userModel'].findOne({ email });
}

// So sánh mật khẩu
async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(plain, hash);
}
// Service xử lý logic liên quan đến User
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  // Inject model User từ Mongoose
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findByEmail = findByEmail;
  comparePassword = comparePassword;

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

  // Hàm đăng nhập user
  async login(data: import('./dto/login-user.dto').LoginUserDto) {
    // Tìm user theo email
    const user = await this.userModel.findOne({ email: data.email });
    if (!user) {
      throw new BadRequestException('Email hoặc mật khẩu không đúng');
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
