import { PrismaService } from '../prisma.service';
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { RoleEntity } from './entities/role.entity';
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prismaService.user.findMany({
      include: {
        role: true,
      },
    });
    return users.map(
      (user) =>
        new UserEntity(
          user.id,
          user.email,
          user.firstName,
          user.lastName,
          user.dateOfBirth,
          user.dateOfRegistration,
          user.passwordHash,
          user.roleId,
          new RoleEntity(user.role.id, user.role.role),
        ),
    );
  }

  async findOne(email: string): Promise<UserEntity> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
      include: {
        role: true,
      },
    });
    return new UserEntity(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.dateOfBirth,
      user.dateOfRegistration,
      user.passwordHash,
      user.roleId,
      new RoleEntity(user.role.id, user.role.role),
    );
  }

  async create(
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    passwordHash: string,
  ): Promise<UserEntity> {
    const user = await this.prismaService.user.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: new Date(dateOfBirth),
        passwordHash: passwordHash,
      },
      include: {
        role: true,
      },
    });
    return new UserEntity(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.dateOfBirth,
      user.dateOfRegistration,
      user.passwordHash,
      user.roleId,
      new RoleEntity(user.role.id, user.role.role),
    );
  }
}
