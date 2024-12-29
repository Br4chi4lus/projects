import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDTO } from './dtos/task.dto';
import { CreateTaskDTO } from './dtos/create.task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnershipGuard } from '../auth/guards/ownership.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { StateOfProjectDTO } from '../projects/dtos/state-of-project.dto';
@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  public async createTask(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Body() dto: CreateTaskDTO,
  ): Promise<TaskDTO> {
    const task = await this.tasksService.createTask(dto, projectId);

    return TaskDTO.fromEntity(task);
  }

  @Get()
  public async findTasksByProjectId(
    @Param('projectId', new ParseIntPipe()) projectId: number,
  ): Promise<TaskDTO[]> {
    const tasks = await this.tasksService.getTasks(projectId);

    return tasks.map((task) => TaskDTO.fromEntity(task));
  }

  @Get(':taskId')
  public async findTaskByProjectIdAndTaskId(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Param('taskId', new ParseIntPipe()) taskId: number,
  ): Promise<TaskDTO> {
    const task = await this.tasksService.getTaskById(projectId, taskId);

    return TaskDTO.fromEntity(task);
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(OwnershipGuard)
  public async deleteTask(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Param('taskId', new ParseIntPipe()) taskId: number,
  ): Promise<TaskDTO> {
    const deletedTask = await this.tasksService.deleteTask(projectId, taskId);

    return TaskDTO.fromEntity(deletedTask);
  }

  @UseGuards(OwnershipGuard)
  @Put(':taskId')
  public async updateStateOfTask(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Param('taskId', new ParseIntPipe()) taskId: number,
    @Body() dto: StateOfProjectDTO,
  ): Promise<TaskDTO> {
    const task = await this.tasksService.updateStateOfTask(
      projectId,
      taskId,
      dto.state,
    );

    return TaskDTO.fromEntity(task);
  }
}
