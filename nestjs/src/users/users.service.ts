import { PrismaService } from '../prisma.service';
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prismaService.user.findMany();
    return users.map(
      (user) =>
        new UserEntity(
          user.id,
          user.email,
          user.firstName,
          user.lastName,
          user.dateOfBirth,
          user.dateOfRegistration,
        ),
    );
  }

  async create(
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
  ): Promise<UserEntity> {
    const user = await this.prismaService.user.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: new Date(dateOfBirth),
      },
    });
    return new UserEntity(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.dateOfBirth,
      user.dateOfRegistration,
    );
  }
}
