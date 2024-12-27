import { Role } from '@prisma/client';

export class RoleEntity {
  roleId: number;
  roleName: string;
  constructor(roleId: number, roleName: string) {
    this.roleId = roleId;
    this.roleName = roleName;
  }

  public static fromModel(model: Role): RoleEntity {
    return new RoleEntity(model.id, model.role);
  }
}
