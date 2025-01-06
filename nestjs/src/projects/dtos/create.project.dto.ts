import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDTO {
  @ApiProperty({ example: 'New Project' })
  name: string;
  @ApiProperty({ example: 'Description of the project...' })
  description: string;
  @ApiProperty({ type: [Number], example: [1, 2] })
  userIds: number[];
}
