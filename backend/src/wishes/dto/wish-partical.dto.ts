import { OmitType, PartialType } from '@nestjs/swagger';
import { Wish } from '../entities/wish.entity';

export class WishPartical extends PartialType(
  OmitType(Wish, ['owner', 'offers']),
) {}
