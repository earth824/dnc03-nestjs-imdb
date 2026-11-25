import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { type RegisterDto, registerSchema } from './dto/register.dto.js';
import { User as UserEntity } from '../user/user.entity.js';
import { AuthService } from './auth.service.js';
import { loginSchema, type LoginDto } from './dto/login.dto.js';
import { User } from './decorators/user.decorator.js';
import { Public } from './decorators/public.decorator.js';

type LoginResult = {
  accessToken: string;
  type: 'Bearer';
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(
    @Body({ schema: registerSchema }) dto: RegisterDto,
  ): Promise<UserEntity> {
    return this.authService.register(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body({ schema: loginSchema }) dto: LoginDto,
  ): Promise<LoginResult> {
    const accessToken = await this.authService.login(dto.email, dto.password);
    return { accessToken, type: 'Bearer' };
  }

  @Get('me')
  async getMe(@User('id') userId: number): Promise<UserEntity> {
    return this.authService.getMe(userId);
  }
}
