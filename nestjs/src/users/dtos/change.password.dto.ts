import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'password' })
  password: string;
  @ApiProperty({ example: 'password' })
  passwordConfirmation: string;
}
