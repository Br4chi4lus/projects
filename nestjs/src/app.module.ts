import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectUsersModule } from './project-users/project-users.module';

@Module({
  imports: [
    UsersModule,
    TasksModule,
    AuthModule,
    ProjectsModule,
    ProjectUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
