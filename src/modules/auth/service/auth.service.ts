import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/entities/auth.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Kiểm tra email đã tồn tại chưa?
    const findUserByEmail = await this.userRepository.findOne({
      where: { Email: registerDto.Email },
    });

    // Kiểm tra
    if (findUserByEmail) {
      throw new HttpException('Email đã tồn tại', 400);
    } else {
      // Tạo ra một đối tươngj user
      const newUser: RegisterDto = {
        UserId: uuidv4(),
        UserName: registerDto.UserName,
        Email: registerDto.Email,
        Password: registerDto.Password,
        Role: registerDto.Role,
        CreatedAt: registerDto.CreatedAt,
        ModifiedAt: registerDto.ModifiedAt,
      };

      // Khởi tạo instance
      const newUserInstance = await this.userRepository.create(newUser);

      // Lưu vào database
      return await this.userRepository.save(newUserInstance);
    }
  }

  async login(loginDto: LoginDto) {
    // Kiểm tra email có tồn tại trong db?
    const findUserByEmail = await this.userRepository.findOne({
      where: { Email: loginDto.Email },
    });

    if (!findUserByEmail) {
      throw new HttpException('Email không đúng', 400);
    } else {
      // Hash password
      const comparePassword = bcrypt.compareSync(
        loginDto.Password,
        findUserByEmail.Password,
      );

      if (!comparePassword) {
        throw new HttpException('Mật khẩu không đúng', 400);
      } else {
        // Dữ liệu + access_token
        const payload = {
          userId: findUserByEmail.UserId,
          userName: findUserByEmail.UserName,
          email: findUserByEmail.Email,
          role: findUserByEmail.Role,
        };

        const access_token = await this.jwtService.signAsync(payload);

        return {
          data: payload,
          token: access_token,
        };
      }
    }
  }
}
