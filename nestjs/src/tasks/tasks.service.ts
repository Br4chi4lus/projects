import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectsService } from '../projects/projects.service';
import { CreateTaskDTO } from './dtos/create.task.dto';

import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly projectService: ProjectsService,
  ) {}

  public async getTasks(projectId: number) {
    const tasks = await this.prismaService.task.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        user: {
          include: {
            role: true,
          },
        },
        state: true,
      },
    });

    if (!tasks) {
      throw new NotFoundException('Project not found');
    }

    return tasks.map((task) => TaskEntity.fromModel(task));
  }

  public async getTaskById(
    projectId: number,
    taskId: number,
  ): Promise<TaskEntity> {
    const task = await this.prismaService.task.findFirst({
      where: {
        AND: [
          {
            projectId: projectId,
          },
          {
            id: taskId,
          },
        ],
      },
      include: {
        user: {
          include: {
            role: true,
          },
        },
        state: true,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return TaskEntity.fromModel(task);
  }

  public async createTask(
    createTaskDto: CreateTaskDTO,
    projectId: number,
  ): Promise<TaskEntity> {
    try {
      const task = await this.prismaService.task.create({
        data: {
          name: createTaskDto.name,
          description: createTaskDto.description,
          userId: createTaskDto.userId,
          projectId: projectId,
        },
        include: {
          user: {
            include: {
              role: true,
            },
          },
          state: true,
        },
      });

      await this.projectService.updateDateOfModify(projectId);

      return TaskEntity.fromModel(task);
    } catch (error) {
      if (
        error.message.toLowerCase().includes('foreign key constraint violated')
      ) {
        throw new NotFoundException('Project not found');
      } else {
        throw error;
      }
    }
  }

  public async deleteTask(
    projectId: number,
    taskId: number,
  ): Promise<TaskEntity> {
    try {
      const task = await this.prismaService.task.findFirst({
        where: {
          AND: [{ id: taskId }, { projectId: projectId }],
        },
      });

      const deletedTask = await this.prismaService.task.delete({
        where: {
          id: taskId,
        },
        include: {
          user: {
            include: {
              role: true,
            },
          },
          state: true,
        },
      });

      return TaskEntity.fromModel(deletedTask);
    } catch (error) {
      if (
        error.message.toLowerCase().includes('foreign key constraint violated')
      ) {
        throw new NotFoundException('Project not found');
      } else if (error.message.toLowerCase().includes('not found')) {
        throw new NotFoundException('Task not found');
      } else {
        throw error;
      }
    }
  }

  public async updateStateOfTask(
    projectId: number,
    taskId: number,
    state: string,
  ): Promise<TaskEntity> {
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
      const task = await this.prismaService.task.update({
        where: {
          projectId: projectId,
          id: taskId,
        },
        data: {
          stateId: stateReturn.id,
        },
        include: {
          user: {
            include: {
              role: true,
            },
          },
          state: true,
        },
      });

      return TaskEntity.fromModel(task);
    } catch (error) {
      if (error.message.toLowerCase().includes('not found')) {
        throw new NotFoundException('Task not found');
      } else throw error;
    }
  }
}
