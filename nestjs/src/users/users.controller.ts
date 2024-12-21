import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { UserDTO } from './dtos/user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create.user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  public async getUsers(): Promise<UserDTO[]> {
    const users: UserEntity[] = await this.usersService.findAll();
    return users.map<UserDTO>((user) => UserDTO.fromEntity(user));
  }

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserDTO> {
    const user = await this.usersService.create(
      createUserDto.email,
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.dateOfBirth,
    );
    return UserDTO.fromEntity(user);
  }
}
