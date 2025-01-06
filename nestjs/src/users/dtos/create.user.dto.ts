import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com' })
  email: string;
  @ApiProperty({ example: 'John' })
  firstName: string;
  @ApiProperty({ example: 'Doe' })
  lastName: string;
  @ApiProperty({ example: new Date() })
  dateOfBirth: Date;
  @ApiProperty({ example: 'password' })
  password: string;
  @ApiProperty({ example: 'password' })
  passwordConfirmation: string;
}
