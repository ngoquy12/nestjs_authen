import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  UserId: string;

  @IsNotEmpty({ message: 'Tên không được để trống.' })
  @MinLength(5, { message: 'Tên không được ngắn hơn 5 ký tự.' })
  UserName: string;

  @IsNotEmpty({ message: 'Tên không được để trống.' })
  @IsEmail({}, { message: 'Email không đúng định dạng.' })
  Email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống.' })
  @MinLength(5, { message: 'Mật khẩu không được ngắn hơn 5 ký tự.' })
  Password: string;
  Role: number;
  CreatedAt: string;
  ModifiedAt: string;
}
