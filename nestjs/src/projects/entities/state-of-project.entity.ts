import { StateOfProject } from '@prisma/client';

export class StateOfProjectEntity {
  id: number;
  state: string;

  constructor(id: number, state: string) {
    this.id = id;
    this.state = state;
  }

  public static fromModel(model: StateOfProject) {
    return new StateOfProjectEntity(model.id, model.state);
  }
}
