import { ApiProperty, PickType } from '@nestjs/swagger';
import { Wishlist } from '../entities/wishlist.entity';
import { IsNotEmpty } from 'class-validator';
// export class CreateWishlistDto extends OmitType(Wishlist, ['owner', 'items']) {
//   @ApiProperty({ example: '[ 0 ]', isArray: true })
//   @IsNotEmpty()
//   itemsId: Array<number>;
// }

export class CreateWishlistDto extends PickType(Wishlist, ['name', 'image']) {
  @ApiProperty({ example: '[ ]', isArray: true })
  @IsNotEmpty()
  itemsId: Array<number>;
}
