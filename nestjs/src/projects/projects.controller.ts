import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjectDTO } from './dtos/create.project.dto';
import { ProjectDTO } from './dtos/project.dto';
import { ProjectsService } from './projects.service';
import { UserEntity } from '../users/entities/user.entity';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}
  @Post()
  @Roles('Manager', 'Admin')
  async create(
    @Body() dto: CreateProjectDTO,
    @Req() request,
  ): Promise<ProjectDTO> {
    const user = request.user as UserEntity;
    const project = await this.projectService.createProject(dto, user.id);
    return ProjectDTO.fromEntity(project);
  }
  @Roles('Admin')
  @Get()
  async findAll(): Promise<ProjectDTO[]> {
    const projects = await this.projectService.findAll();
    return projects.map((project) => ProjectDTO.fromEntity(project));
  }
}
