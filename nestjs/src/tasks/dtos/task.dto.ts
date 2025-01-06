import { UserDTO } from '../../users/dtos/user.dto';

import { TaskEntity } from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDTO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  user: UserDTO;
  @ApiProperty()
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
