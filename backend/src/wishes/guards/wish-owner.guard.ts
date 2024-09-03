// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
// } from '@nestjs/common';
// import { Wish } from 'src/wishes/entities/wish.entity';
// import { WishesService } from '../wishes.service';
// import { WhishlistsService } from 'src/wishlists/wishlists.service';
// import { MAP_EXCEPTION_TEXT } from 'src/constants/constants';

// @Injectable()
// export class WishOwnerGuard implements CanActivate {
//   constructor(
//     private readonly wishService: WishesService,
//     private readonly wishlistService: WhishlistsService
//     ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const req = context.switchToHttp().getRequest();
//     const resource = req.path.split('/')[1]
//     console.log(resource)
//     const userWishes: Wish[] = await this.wishService.findAllUsersWish(
//       req.user.username,
//     );
//     const wishId: number = +req.params.id;

//     const wishExists = userWishes.some((wish) => wish.id === wishId);

//     if (!wishExists) {
//       throw new ForbiddenException(MAP_EXCEPTION_TEXT.wish.notOwn);
//     }

//     return true;
//   }
// }
