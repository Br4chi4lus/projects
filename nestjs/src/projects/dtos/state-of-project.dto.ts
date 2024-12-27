import { StateOfProjectEntity } from '../entities/state-of-project.entity';

export class StateOfProjectDTO {
  state: string;

  constructor(state: string) {
    this.state = state;
  }
  public static fromEntity(entity: StateOfProjectEntity): StateOfProjectDTO {
    return new StateOfProjectDTO(entity.state);
  }
}
