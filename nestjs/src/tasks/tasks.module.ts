import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma.service';
import { ProjectsService } from '../projects/projects.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService, ProjectsService],
})
export class TasksModule {}
