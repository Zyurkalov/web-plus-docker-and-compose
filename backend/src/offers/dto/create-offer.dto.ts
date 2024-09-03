import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { PickType, PartialType, ApiProperty } from '@nestjs/swagger';
import { Offer } from '../entities/offer.entity';

export class CreateOfferDto extends PartialType(PickType(Offer, ['hidden'])) {
  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  itemId: number;
}
