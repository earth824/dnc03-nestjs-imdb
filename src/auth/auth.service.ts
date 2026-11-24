import { Injectable } from '@nestjs/common';
import { Gender, User } from '../user/user.entity.js';
import { UserService } from '../user/user.service.js';

type RegisterInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dob?: Date;
  gender?: Gender;
};

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  register(input: RegisterInput): Promise<User> {
    return this.userService.create({ ...input, role: 'USER' });
  }
}
