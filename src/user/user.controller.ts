import { Body, Controller, Post } from '@nestjs/common';
import {
  createAdminSchema,
  type CreateAdminDto,
} from './dto/create-admin.dto.js';
import { User } from './user.entity.js';
import { UserService } from './user.service.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('SUPER_ADMIN')
  @Post('admin')
  createAdmin(
    @Body({ schema: createAdminSchema }) dto: CreateAdminDto,
  ): Promise<User> {
    return this.userService.createAdmin(dto);
  }
}
