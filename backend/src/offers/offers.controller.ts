import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { AuthUser } from 'src/common/decorator/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Offer } from './entities/offer.entity';
import { WishesGuard } from './guards/offers.guard';
import { MAP_PATH } from 'src/constants/constants';

@ApiTags(MAP_PATH.offers)
@ApiExtraModels(Offer)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller(MAP_PATH.offers)
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(WishesGuard)
  @ApiResponse({
    status: 201,
    type: Object,
  })
  @Post()
  async create(
    @AuthUser() user: User,
    @Body() createOfferDto: CreateOfferDto,
  ): Promise<object> {
    await this.offersService.create(user, createOfferDto);
    return {};
  }

  @ApiOkResponse({
    type: Offer,
    isArray: true,
  })
  @Get()
  findAll(): Promise<Offer[]> {
    return this.offersService.getAll();
  }

  @ApiOkResponse({
    type: Offer,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Offer> {
    return await this.offersService.getOne(+id);
  }
}
