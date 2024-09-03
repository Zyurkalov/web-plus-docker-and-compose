import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { UsersService } from 'src/users/users.service';
import { UserAlreadyExist } from '../common/guards/user-already-exist.guard';
import { SignupUserResponseDto } from './dto/signup-user-response.dto';
import { SigninUserResponseDto } from './dto/signin-user-response.dto';
import { MAP_ERRORS, MAP_PATH } from 'src/constants/constants';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags(MAP_PATH.auth)
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно авторизован',
    type: SigninUserResponseDto,
  })
  @ApiResponse({
    status: MAP_ERRORS.invalidCredentials.statusCode,
    description: MAP_ERRORS.invalidCredentials.message,
  })
  async login(@Body() userData: SigninUserDto): Promise<SigninUserResponseDto> {
    return await this.authService.validatePassword(
      userData.username,
      userData.password,
    );
  }

  @UseGuards(UserAlreadyExist)
  @Post('signup')
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрирован',
    type: SignupUserResponseDto,
  })
  @ApiResponse({
    status: MAP_ERRORS.userAlreadyExists.statusCode,
    description: MAP_ERRORS.userAlreadyExists.message,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignupUserResponseDto> {
    return await this.userService.registration(createUserDto);
  }
}
