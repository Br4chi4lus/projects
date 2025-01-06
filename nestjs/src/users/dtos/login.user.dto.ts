import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
  @ApiProperty({ example: 'user@mail.com' })
  email: string;
  @ApiProperty({ example: 'password' })
  password: string;
}
