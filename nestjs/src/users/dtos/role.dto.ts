import { RoleEntity } from '../entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDTO {
  @ApiProperty()
  roleName: string;
  constructor(roleName: string) {
    this.roleName = roleName;
  }
  public static fromEntity(entity: RoleEntity): RoleDTO {
    return new RoleDTO(entity.roleName);
  }
}
