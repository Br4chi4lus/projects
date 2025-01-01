import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ParticipantGuard } from '../auth/guards/participant.guard';
import { UserDTO } from '../users/dtos/user.dto';
import { ProjectUsersService } from './project-users.service';
import { OwnershipGuard } from '../auth/guards/ownership.guard';
import { AddUserToProjectDTO } from './dtos/add.user.to.project.dto';

@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/users')
export class ProjectUsersController {
  constructor(private readonly projectUsersService: ProjectUsersService) {}

  @Get()
  @UseGuards(ParticipantGuard)
  public async findAll(
    @Param('projectId', new ParseIntPipe()) projectId: number,
  ): Promise<UserDTO[]> {
    const users = await this.projectUsersService.findAll(projectId);

    return users.map((user) => UserDTO.fromEntity(user));
  }

  @Post()
  @UseGuards(OwnershipGuard)
  public async addUser(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Body() dto: AddUserToProjectDTO,
  ): Promise<UserDTO> {
    const user = await this.projectUsersService.addOne(projectId, dto.userId);

    return UserDTO.fromEntity(user);
  }

  @Delete(':userId')
  @UseGuards(OwnershipGuard)
  public async deleteUserFromProject(
    @Param('projectId', new ParseIntPipe()) projectId: number,
    @Param('userId', new ParseIntPipe()) userId: number,
  ): Promise<UserDTO> {
    const user = await this.projectUsersService.delete(projectId, userId);

    return UserDTO.fromEntity(user);
  }
}
