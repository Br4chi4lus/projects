import { UserEntity } from '../../users/entities/user.entity';
import { Role, Task, User } from '@prisma/client';
import { StateOfProjectEntity } from '../../projects/entities/state-of-project.entity';

export class TaskEntity {
  id: number;
  name: string;
  description: string;
  userId: number;
  user: UserEntity;
  projectId: number;
  state: StateOfProjectEntity;
  stateId: number;

  constructor(
    id: number,
    name: string,
    description: string,
    user: UserEntity,
    projectId: number,
    state: StateOfProjectEntity,
    stateId: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.user = user;
    this.projectId = projectId;
    this.state = state;
    this.stateId = stateId;
  }

  public static fromModel(
    model: Task & { user: User & { role: Role } } & {
      state: StateOfProjectEntity;
    },
  ): TaskEntity {
    return new TaskEntity(
      model.id,
      model.name,
      model.description,
      UserEntity.fromModel(model.user),
      model.projectId,
      model.state,
      model.state.id,
    );
  }
}
