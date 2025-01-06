import { ApiProperty } from '@nestjs/swagger';

export class AddUserToProjectDTO {
  @ApiProperty({ example: 1 })
  userId: number;
}
