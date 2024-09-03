import { OmitType } from '@nestjs/swagger';
import { Wish } from 'src/wishes/entities/wish.entity';

export class UserWishesDto extends OmitType(Wish, ['owner'] as const) {}
