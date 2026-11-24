import { ConflictException, Injectable } from '@nestjs/common';
import { Gender, Role, User } from './user.entity.js';
import { UserRepository } from './user.repository.js';
import { ArgonService } from '../hasher/argon.service.js';

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
  constructor(
    private readonly userRepository: UserRepository,
    private readonly argonService: ArgonService,
  ) {}

  async create(input: CreateInput): Promise<User> {
    const lowerCaseEmail = input.email.toLowerCase();
    const existUser = await this.userRepository.findByEmail(lowerCaseEmail);

    if (existUser) {
      throw new ConflictException('Email is already in use');
    }

    const passwordHash = await this.argonService.hash(input.password);
    const user = await this.userRepository.create({
      ...input,
      email: lowerCaseEmail,
      password: passwordHash,
    });

    if (!user) {
      throw new ConflictException('Email is already in use');
    }

    return user;
  }
}
