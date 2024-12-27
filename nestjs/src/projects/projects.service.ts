import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProjectDTO } from './dtos/create.project.dto';
import { ProjectEntity } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  async createProject(dto: CreateProjectDTO, managerId: number) {
    try {
      const project = await this.prismaService.project.create({
        data: {
          name: dto.name,
          description: dto.description,
          managerId: managerId,
          users: {
            connect: dto.userIds.map((id) => ({ id: id })),
          },
        },
        include: {
          users: {
            include: {
              role: true,
            },
          },
          manager: {
            include: {
              role: true,
            },
          },
          state: true,
        },
      });
      return ProjectEntity.fromModel(project);
    } catch (error) {
      if (error.message.toLowerCase().includes('not found')) {
        throw new NotFoundException('Some users have not been found');
      } else {
        throw error;
      }
    }
  }

  async findAll(): Promise<ProjectEntity[]> {
    const projects = await this.prismaService.project.findMany({
      include: {
        manager: {
          include: {
            role: true,
          },
        },
        users: {
          include: {
            role: true,
          },
        },
        state: true,
      },
    });

    return projects.map((project) => ProjectEntity.fromModel(project));
  }
}
