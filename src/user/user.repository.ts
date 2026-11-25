import { Injectable } from '@nestjs/common';
import { Gender, Role, User } from './user.entity.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { isUniqueConstraintViolation } from '../prisma/prisma-error.js';

type CreateData = {
  email: string;
  password: string;
  role: Role;
  firstName?: string;
  lastName?: string;
  dob?: Date;
  gender?: Gender;
};

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: CreateData): Promise<User | null> {
    try {
      return this.prisma.user.create({ data });
    } catch (error) {
      if (isUniqueConstraintViolation(error)) return null;
      throw error;
    }
  }

  findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
