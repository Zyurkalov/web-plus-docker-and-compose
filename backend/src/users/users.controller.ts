import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { FindUsersDto } from './dto/find-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { UserProfileResponseDto } from './dto/user-profile-response.dto';
import { UserPublicProfileResponseDto } from './dto/user-public-profile-response.dto';
import { UserWishesDto } from './dto/user-wihes.dto';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MAP_ERRORS, MAP_PATH } from 'src/constants/constants';
import { Wish } from 'src/wishes/entities/wish.entity';
import { UserAlreadyExist } from 'src/common/guards/user-already-exist.guard';

@ApiTags(MAP_PATH.users)
@ApiExtraModels(User)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller(MAP_PATH.users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: UserProfileResponseDto })
  @Get('me')
  getMe(@AuthUser() user: User): Promise<UserProfileResponseDto> {
    return this.usersService.getAuthUserData(user);
  }

  @ApiOkResponse({
    type: UserProfileResponseDto,
  })
  @ApiResponse({
    status: MAP_ERRORS.validationError.statusCode,
    description: MAP_ERRORS.validationError.message,
  })
  @UseGuards(UserAlreadyExist)
  @Patch('me')
  async update(
    @AuthUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileResponseDto> {
    return this.usersService.update(user, updateUserDto);
  }

  @ApiOkResponse({
    type: Wish,
    isArray: true,
  })
  @Get('me/wishes')
  async findMyWish(@AuthUser() user: User): Promise<Wish[]> {
    return await this.usersService.findOwnWish(user);
  }

  @ApiOkResponse({ type: UserPublicProfileResponseDto })
  @Get(':username')
  async findUser(
    @Param('username') userName: string,
  ): Promise<UserPublicProfileResponseDto> {
    return this.usersService.findUserByQuery(userName);
  }

  @ApiOkResponse({
    type: UserWishesDto,
    isArray: true,
  })
  @Get(':username/wishes')
  async getWishes(
    @Param('username') userName: string,
  ): Promise<Array<UserWishesDto>> {
    return this.usersService.findUserWishes(userName);
  }

  @ApiResponse({
    status: 201,
    type: UserProfileResponseDto,
    isArray: true,
  })
  @Post('find')
  async findUserByBody(
    @Body() body: FindUsersDto,
  ): Promise<UserProfileResponseDto[]> {
    return this.usersService.getUserByBody(body.query);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
