import { Body, Controller, Post, Response } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dtos/login.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async create(@Body() registerDto: RegisterDto, @Response() res) {
    try {
      // Lấy kết quả trả về từ service
      await this.authService.register(registerDto);
      return res.status(201).json({
        status: 201,
        message: 'Thêm mới thành công',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error,
      });
    }
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Response() res) {
    try {
      const result = await this.authService.login(loginDto);

      return res.status(200).json({
        status: 200,
        message: 'Đăng nhập thành công',
        result,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        status: 500,
        message: error,
      });
    }
  }
}
