import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WhishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWhishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { MAP_PATH } from 'src/constants/constants';
import { OwnerCheckGuard } from 'src/common/guards/ckeck-owner.guard';

@ApiTags(MAP_PATH.wishlist)
@ApiExtraModels(Wishlist)
@Controller(MAP_PATH.wishlist)
export class WhishlistsController {
  constructor(private readonly whishlistsService: WhishlistsService) {}

  @ApiOkResponse({
    type: Wishlist,
    isArray: true,
  })
  @Get()
  findAll(): Promise<Wishlist[]> {
    return this.whishlistsService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    type: Wishlist,
  })
  @Post()
  async create(
    @AuthUser() user: User,
    @Body() createWhishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    return await this.whishlistsService.create(user, createWhishlistDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Wishlist })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Wishlist> {
    return this.whishlistsService.getOneOrThrow(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, OwnerCheckGuard)
  @ApiOkResponse({ type: Wishlist })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWhishlistDto: UpdateWhishlistDto,
  ): Promise<Wishlist> {
    return this.whishlistsService.update(+id, updateWhishlistDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, OwnerCheckGuard)
  @ApiOkResponse({ type: Wishlist })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Wishlist> {
    return this.whishlistsService.remove(+id);
  }
}
