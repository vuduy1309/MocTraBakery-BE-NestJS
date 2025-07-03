// Định nghĩa schema cho User sử dụng Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Kiểu UserDocument để sử dụng với Mongoose
export type UserDocument = User & Document;

// Định nghĩa schema User
@Schema()
export class User {
  // Họ tên đầy đủ
  @Prop({ required: true })
  fullName: string;

  // Email, phải là duy nhất
  @Prop({ required: true, unique: true })
  email: string;

  // Mật khẩu đã được hash
  @Prop({ required: true })
  passwordHash: string;

  // Vai trò của user, mặc định là 'Customer'
  @Prop({ default: 'Customer' })
  role: string;

  // Số điện thoại
  @Prop()
  phone: string;

  // Địa chỉ
  @Prop()
  address: string;

  // Đường dẫn avatar
  @Prop()
  avatarUrl: string;

  // Thời gian tạo tài khoản
  @Prop({ default: Date.now })
  createdAt: Date;

  // Trạng thái hoạt động (true: hoạt động, false: bị khoá)
  @Prop({ default: true })
  isActive: boolean;
}

// Tạo schema từ class User
export const UserSchema = SchemaFactory.createForClass(User);
