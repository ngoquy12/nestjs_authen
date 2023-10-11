import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email không được để trống.' })
  Email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống.' })
  Password: string;
}
