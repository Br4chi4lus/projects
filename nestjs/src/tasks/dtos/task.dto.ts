import { UserDTO } from '../../users/dtos/user.dto';

import { TaskEntity } from '../entities/task.entity';

export class TaskDTO {
  id: number;
  name: string;
  description: string;
  user: UserDTO;
  state: string;

  constructor(
    id: number,
    name: string,
    description: string,
    user: UserDTO,
    state: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.user = user;
    this.state = state;
  }

  public static fromEntity(task: TaskEntity): TaskDTO {
    return new TaskDTO(
      task.id,
      task.name,
      task.description,
      UserDTO.fromEntity(task.user),
      task.state.state,
    );
  }
}
