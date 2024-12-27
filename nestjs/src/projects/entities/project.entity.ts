import { UserEntity } from '../../users/entities/user.entity';
import { Project, Role, StateOfProject, User } from '@prisma/client';
import { StateOfProjectEntity } from './state-of-project.entity';

export class ProjectEntity {
  id: number;
  name: string;
  description: string;
  managerId: number;
  manager: UserEntity;
  users: UserEntity[];
  dateOfCreation: Date;
  dateOfModified: Date;
  stateId: number;
  state: StateOfProjectEntity;

  constructor(
    id: number,
    name: string,
    description: string,
    managerId: number,
    manager: UserEntity,
    users: UserEntity[],
    dateOfCreation: Date,
    dateOfModified: Date,
    stateId: number,
    state: StateOfProjectEntity,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.managerId = managerId;
    this.manager = manager;
    this.users = users;
    this.dateOfCreation = dateOfCreation;
    this.dateOfModified = dateOfModified;
    this.stateId = stateId;
    this.state = state;
  }

  public static fromModel(
    model: Project & { manager: User & { role: Role } } & {
      users: (User & { role: Role })[];
    } & { state: StateOfProject },
  ): ProjectEntity {
    return new ProjectEntity(
      model.id,
      model.name,
      model.description,
      model.managerId,
      UserEntity.fromModel(model.manager),
      model.users.map((user) => UserEntity.fromModel(user)),
      model.dateOfCreation,
      model.dateOfModified,
      model.stateId,
      StateOfProjectEntity.fromModel(model.state),
    );
  }
}
