import { StateOfProjectEntity } from '../entities/state-of-project.entity';
import { ApiProperty } from '@nestjs/swagger';

export class StateOfProjectDTO {
  @ApiProperty({ example: 'Cancelled' })
  state: string;

  constructor(state: string) {
    this.state = state;
  }
  public static fromEntity(entity: StateOfProjectEntity): StateOfProjectDTO {
    return new StateOfProjectDTO(entity.state);
  }
}
