import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  ForbiddenException,
} from '@nestjs/common';
import { MAP_EXCEPTION_TEXT, MAP_PATH } from 'src/constants/constants';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { WhishlistsService } from 'src/wishlists/wishlists.service';

@Injectable()
export class OwnerCheckGuard implements CanActivate {
  private readonly logger: Logger;

  constructor(
    private readonly wishService: WishesService,
    private readonly wishlistService: WhishlistsService,
  ) {
    this.logger = new Logger(OwnerCheckGuard.name);
  }

  private readonly generateError = (message: string) => {
    throw new ForbiddenException(message);
  };
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const paramId = +req.params.id;
    const resource = req.path.split('/')[1];
    let isOwner = false;

    if (resource === MAP_PATH.wishes) {
      const userWishes: Wish[] = await this.wishService.findAllUsersWish(
        user.username,
      );
      isOwner = userWishes.some((wish) => wish.id === paramId);
      !isOwner ? this.generateError(MAP_EXCEPTION_TEXT.wish.notOwn) : null;
    } else if (resource === MAP_PATH.wishlist) {
      const userWishlist: Wishlist[] =
        await this.wishlistService.findAllUserWishlists(user.username);
      isOwner = userWishlist.some((wishlist) => wishlist.id === paramId);
      !isOwner ? this.generateError(MAP_EXCEPTION_TEXT.wishlist.notOwn) : null;
    } else {
      this.logger.warn(
        `Необработанный путь для OwnerCheckGuard: ${req.path} пользователя: ${user.username}`,
      );
    }
    return isOwner;
  }
}
