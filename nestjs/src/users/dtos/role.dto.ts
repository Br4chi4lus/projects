import { RoleEntity } from '../entities/role.entity';

export class RoleDTO {
  roleName: string;
  constructor(roleName: string) {
    this.roleName = roleName;
  }
  public static fromEntity(entity: RoleEntity): RoleDTO {
    return new RoleDTO(entity.roleName);
  }
}
