import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Gender, User } from '../user/user.entity.js';
import { UserService } from '../user/user.service.js';
import { ArgonService } from '../hasher/argon.service.js';
import { JwtService } from '../jwt/jwt.service.js';

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
  constructor(
    private readonly userService: UserService,
    private readonly argonService: ArgonService,
    private readonly jwtService: JwtService,
  ) {}

  register(input: RegisterInput): Promise<User> {
    return this.userService.create({ ...input, role: 'USER' });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.findByEmail(email);
    if (!user || !user.status) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await this.argonService.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return accessToken;
  }

  async getMe(userId: number): Promise<User> {
    const user = await this.userService.findById(userId);
    if (!user || !user.status)
      throw new UnauthorizedException('User has been deleted or disabled');
    return user;
  }
}
