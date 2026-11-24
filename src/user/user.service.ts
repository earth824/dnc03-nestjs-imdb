import { Injectable } from '@nestjs/common';
import { Gender, Role, User } from './user.entity.js';
import { UserRepository } from './user.repository.js';

type CreateInput = {
  email: string;
  password: string;
  role: Role;
  firstName?: string;
  lastName?: string;
  dob?: Date;
  gender?: Gender;
};

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(input: CreateInput): Promise<User> {
    const existUser = await this.userRepository.findByEmail(
      input.email.toLowerCase(),
    );
  }
}
