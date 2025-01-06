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
import { StateOfProjectDTO } from '../projects/dtos/state-of-project.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ParticipantGuard } from '../auth/guards/participant.guard';
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized user, insufficient credentials',
})
@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(OwnershipGuard)
  @ApiCreatedResponse({ description: 'Created new task' })
  @ApiNotFoundResponse({ description: 'User/Project not found' })
  public async createTask(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Body() dto: CreateTaskDTO,
  ): Promise<TaskDTO> {
    const task = await this.tasksService.createTask(dto, projectId);

    return TaskDTO.fromEntity(task);
  }

  @Get()
  @UseGuards(ParticipantGuard)
  @ApiOkResponse({ description: 'Successfully retrieved tasks' })
  @ApiNotFoundResponse({ description: 'Project not found' })
  public async findTasksByProjectId(
    @Param('projectId', new ParseIntPipe()) projectId: number,
  ): Promise<TaskDTO[]> {
    const tasks = await this.tasksService.getTasks(projectId);

    return tasks.map((task) => TaskDTO.fromEntity(task));
  }

  @Get(':taskId')
  @UseGuards(ParticipantGuard)
  @ApiOkResponse({ description: 'Successfully retrieved tasks' })
  @ApiNotFoundResponse({ description: 'Project/Task not found' })
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
  @ApiNoContentResponse({ description: 'Successfully deleted task' })
  @ApiNotFoundResponse({ description: 'Project/Task not found' })
  public async deleteTask(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Param('taskId', new ParseIntPipe()) taskId: number,
  ): Promise<TaskDTO> {
    const deletedTask = await this.tasksService.deleteTask(projectId, taskId);

    return TaskDTO.fromEntity(deletedTask);
  }

  @UseGuards(OwnershipGuard)
  @Put(':taskId')
  @ApiOkResponse({ description: 'Successfully updated task' })
  @ApiNotFoundResponse({ description: 'Project/Task not found' })
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
