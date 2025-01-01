import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ProjectsService } from '../projects/projects.service';
import { UserEntity } from '../users/entities/user.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProjectUsersService {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  public async findAll(projectId: number): Promise<UserEntity[]> {
    const project = await this.projectsService.findOne(projectId);

    if (!project) {
      throw new NotFoundException('Project not Found');
    }

    return project.users;
  }

  public async addOne(projectId: number, userId: number): Promise<UserEntity> {
    try {
      const user = await this.usersService.findOneById(userId);

      const project = await this.prismaService.project.update({
        where: {
          id: projectId,
        },
        data: {
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return user;
    } catch (error) {
      if (error.message.toLowerCase().includes('not Found')) {
        throw new NotFoundException('Project not Found');
      } else if (error.message.toLowerCase().includes('not exist')) {
        throw new NotFoundException('User not found');
      } else {
        throw error;
      }
    }
  }

  public async delete(projectId: number, userId: number): Promise<UserEntity> {
    try {
      const user = await this.usersService.findOneById(userId);
      const project = await this.projectsService.findOne(projectId);
      const isUserInProject = project?.users.some((user) => user.id === userId);
      if (!isUserInProject) {
        throw new NotFoundException('User in project not found');
      }
      await this.prismaService.project.update({
        where: {
          id: projectId,
        },
        data: {
          users: {
            disconnect: {
              id: userId,
            },
          },
        },
      });

      return user;
    } catch (error) {
      if (error.message.toLowerCase().includes('user in project not found')) {
        throw error;
      } else if (error.message.toLowerCase().includes('not exist')) {
        throw new NotFoundException('User not found');
      } else if (error.message.toLowerCase().includes('not found')) {
        throw new NotFoundException('Project not Found');
      } else {
        throw error;
      }
    }
  }
}
