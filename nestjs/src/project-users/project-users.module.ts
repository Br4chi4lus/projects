import { Module } from '@nestjs/common';
import { ProjectUsersController } from './project-users.controller';
import { ProjectUsersService } from './project-users.service';
import { ProjectsService } from '../projects/projects.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProjectUsersController],
  providers: [
    ProjectUsersService,
    ProjectsService,
    UsersService,
    PrismaService,
  ],
})
export class ProjectUsersModule {}
