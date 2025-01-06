import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserRoleDto {
  @ApiProperty({ example: 'Manager' })
  newRole: string;
}
