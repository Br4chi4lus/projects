import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDTO {
  @ApiProperty({ example: 'New Task' })
  name: string;
  @ApiProperty({ example: 'Description of the task...' })
  description: string;
  @ApiProperty({ example: 1 })
  userId: number;
}
