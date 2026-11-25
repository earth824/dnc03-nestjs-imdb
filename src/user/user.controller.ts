import { Body, Controller, Post } from '@nestjs/common';
import {
  createAdminSchema,
  type CreateAdminDto,
} from './dto/create-admin.dto.js';
import { User } from './user.entity.js';
import { UserService } from './user.service.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('admin')
  createAdmin(
    @Body({ schema: createAdminSchema }) dto: CreateAdminDto,
  ): Promise<User> {
    return this.userService.createAdmin(dto);
  }
}
