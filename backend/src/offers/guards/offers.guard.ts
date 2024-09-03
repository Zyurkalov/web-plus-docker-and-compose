import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { MAP_EXCEPTION_TEXT } from 'src/constants/constants';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class WishesGuard implements CanActivate {
  private readonly logger = new Logger(WishesGuard.name);
  constructor(private readonly wishesService: WishesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;

    const { amount, itemId } = req.body;
    const { owner, raised, price } = await this.wishesService.getOne(itemId);

    try {
      if (owner.id === userId) {
        throw new ForbiddenException(MAP_EXCEPTION_TEXT.offer.itsOwn);
      }

      if (raised === price) {
        throw new ForbiddenException(MAP_EXCEPTION_TEXT.offer.close);
      }

      if (raised + amount > price) {
        throw new BadRequestException(
          `${MAP_EXCEPTION_TEXT.offer.overprice}. Уменшите до ${
            price - raised
          }`,
        );
      }
    } catch (err) {
      this.logger.warn(
        `Ошибка в запросе пользователя id:${userId} на подарок wishId:${itemId}. ${err.message}`,
      );
      throw err;
    }
    return true;
  }
}
