// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
// } from '@nestjs/common';
// import { Wish } from 'src/wishes/entities/wish.entity';
// import { WishesService } from '../wishes.service';
// import { MAP_EXCEPTION_TEXT } from 'src/constants/constants';

// @Injectable()
// export class WishNotOwnerGuard implements CanActivate {
//   constructor(private readonly wishService: WishesService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const req = context.switchToHttp().getRequest();
//     const user = req.user.username;

//     const userWishes: Wish[] = await this.wishService.findWishesByUsername(user);
//     const wishId: number = +req.params.id;
//     const wish = await this.wishService.findAllByArrayIds([wishId]);
//     const { name, price, link } = wish[0];

//     const wishExists = userWishes.some(
//       ({ name: wishName, link: wishLink, price: wishPrice }) =>
//         wishName === name && wishLink === link && wishPrice === price,
//     );
//     if (wishExists) {
//       throw new ForbiddenException(MAP_EXCEPTION_TEXT.wish.alreadyExists);
//     }

//     return true;
//   }
// }
