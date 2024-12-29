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
          tasks: {
            include: {
              user: {
                include: {
                  role: true,
                },
              },
              state: true,
            },
          },
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
        tasks: {
          include: {
            user: {
              include: {
                role: true,
              },
            },
            state: true,
          },
        },
      },
    });

    return projects.map((project) => ProjectEntity.fromModel(project));
  }

  public async findOne(id: number): Promise<ProjectEntity> {
    const project = await this.prismaService.project.findUnique({
      where: {
        id: id,
      },
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
        tasks: {
          include: {
            user: {
              include: {
                role: true,
              },
            },
            state: true,
          },
        },
      },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return ProjectEntity.fromModel(project);
  }

  public async updateStateOfProject(
    projectId: number,
    state: string,
  ): Promise<ProjectEntity> {
    const stateReturn = await this.prismaService.stateOfProject.findFirst({
      where: {
        state: {
          contains: state,
          mode: 'insensitive',
        },
      },
    });

    if (!stateReturn) {
      throw new NotFoundException('State not found');
    }

    try {
      const project = await this.prismaService.project.update({
        where: {
          id: projectId,
        },
        data: {
          stateId: stateReturn.id,
        },
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
          tasks: {
            include: {
              user: {
                include: {
                  role: true,
                },
              },
              state: true,
            },
          },
        },
      });

      return ProjectEntity.fromModel(project);
    } catch (error) {
      if (error.message.toLowerCase().includes('not found')) {
        throw new NotFoundException('Project not found');
      } else throw error;
    }
  }

  public async updateDateOfModify(projectId: number) {
    const project = await this.prismaService.project.update({
      where: {
        id: projectId,
      },
      data: {
        dateOfModified: new Date(),
      },
    });
  }
}
