// DTO dùng để validate dữ liệu đầu vào khi đăng ký user
import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsOptional, Matches } from 'class-validator';

export class RegisterUserDto {
  // Họ tên đầy đủ, bắt buộc, tối đa 100 ký tự
  @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @MaxLength(100, { message: 'Họ tên tối đa 100 ký tự' })
  fullName: string;

  // Email, bắt buộc, đúng định dạng
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  // Mật khẩu, bắt buộc, tối thiểu 6 ký tự
  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
  password: string;

  // Vai trò, không bắt buộc, chỉ nhận giá trị 'Admin' hoặc 'Customer'
  @IsOptional()
  @Matches(/^(Customer)$/i, { message: 'Role phải là Customer' })
  role?: string;

  // Số điện thoại, không bắt buộc, kiểm tra định dạng số Việt Nam
  @IsOptional()
  @Matches(/^(0[0-9]{9})$/, { message: 'Số điện thoại không hợp lệ' })
  phone?: string;

  // Địa chỉ, không bắt buộc, tối đa 200 ký tự
  @IsOptional()
  @MaxLength(200, { message: 'Địa chỉ tối đa 200 ký tự' })
  address?: string;

  // Đường dẫn avatar, không bắt buộc
  @IsOptional()
  @IsString({ message: 'Avatar phải là chuỗi ký tự' })
  avatarUrl?: string;
}
