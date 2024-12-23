import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create.user.dto';
import { UserDTO } from '../users/dtos/user.dto';
import { LoginUserDTO } from '../users/dtos/login.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(
      createUserDto.email,
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.dateOfBirth,
      createUserDto.password,
      createUserDto.passwordConfirmation,
    );
    return UserDTO.fromEntity(user);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDTO,
  ): Promise<{ access_token: string }> {
    return await this.authService.login(
      loginUserDto.email,
      loginUserDto.password,
    );
  }
}
