import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma.service';
import { ProjectsService } from '../projects/projects.service';
import { ProjectUsersService } from '../project-users/project-users.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    PrismaService,
    ProjectsService,
    ProjectUsersService,
    UsersService,
  ],
})
export class TasksModule {}
