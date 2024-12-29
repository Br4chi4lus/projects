import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ProjectsService } from '../../projects/projects.service';

@Injectable()
export class ParticipantGuard implements CanActivate {
  constructor(private readonly projectsService: ProjectsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    const project = await this.projectsService.findOne(
      Number(request.params.projectId),
    );
    if (user.role.roleName === 'Admin') {
      return true;
    }
    if (project.managerId == user.id) {
      return true;
    }
    if (project.users.some((user) => user.id === request.user.id)) {
      return true;
    }

    return false;
  }
}
