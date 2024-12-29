import { Body, Controller, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create.user.dto';
import { UserDTO } from '../users/dtos/user.dto';
import { LoginUserDTO } from '../users/dtos/login.user.dto';
import { ChangePasswordDto } from '../users/dtos/change.password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
  @Put('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() request,
  ): Promise<UserDTO> {
    const userId = request.user.id;

    const user = await this.authService.changePassword(
      changePasswordDto.password,
      changePasswordDto.passwordConfirmation,
      userId,
    );

    return UserDTO.fromEntity(user);
  }
}
