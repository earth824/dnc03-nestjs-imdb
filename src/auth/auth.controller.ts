import { Body, Controller, Post } from '@nestjs/common';
import { type RegisterDto, registerSchema } from './dto/register.dto.js';
import { User } from '../user/user.entity.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body({ schema: registerSchema }) dto: RegisterDto): Promise<User> {
    return this.authService.register(dto);
  }
}
