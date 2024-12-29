import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Wrong email or password');
    }
    const verified = await bcrypt.compare(password, user.passwordHash);
    if (!verified) {
      throw new UnauthorizedException('Wrong email or password');
    }
    const payload = {
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      dateOfRegistration: user.dateOfRegistration,
      role: user.role.roleName,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    password: string,
    passwordConfirmation: string,
  ) {
    if (password !== passwordConfirmation) {
      throw new BadRequestException('Passwords do not match');
    }

    const existingUser = await this.usersService.findOne(email);
    if (existingUser) {
      throw new BadRequestException('User with given email already exists');
    }

    const user = await this.usersService.create(
      email,
      firstName,
      lastName,
      dateOfBirth,
      await bcrypt.hash(password, 10),
    );
    return user;
  }

  async changePassword(
    password: string,
    passwordConfirmation: string,
    userId: number,
  ): Promise<UserEntity> {
    if (password !== passwordConfirmation) {
      throw new BadRequestException('Passwords do not match');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.usersService.changePassword(passwordHash, userId);

    return user;
  }
}
