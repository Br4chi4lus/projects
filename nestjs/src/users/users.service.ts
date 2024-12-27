import { PrismaService } from '../prisma.service';
import { UserEntity } from './entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    if (!user) {
      return undefined;
    }
    return UserEntity.fromModel(user);
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
    return UserEntity.fromModel(user);
  }

  async updateRole(userId: number, role: string): Promise<UserEntity> {
    const roleReturn = await this.prismaService.role.findFirst({
      where: {
        role: {
          contains: role,
          mode: 'insensitive',
        },
      },
    });

    if (!roleReturn) {
      throw new NotFoundException('Role does not exist');
    }
    try {
      const user = await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          roleId: roleReturn.id,
        },
        include: {
          role: true,
        },
      });
      return UserEntity.fromModel(user);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new NotFoundException('User not found');
      } else {
        throw error;
      }
    }
  }
}
