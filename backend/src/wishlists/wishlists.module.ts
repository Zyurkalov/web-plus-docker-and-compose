import { Module, forwardRef } from '@nestjs/common';
import { WhishlistsService } from './wishlists.service';
import { WhishlistsController } from './wishlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { UsersModule } from 'src/users/users.module';
import { WishesModule } from 'src/wishes/wishes.module';
import { AuthModule } from 'src/auth/auth.module';
import { WishesService } from 'src/wishes/wishes.service';
import { Wish } from 'src/wishes/entities/wish.entity';
import { OwnerCheckGuard } from 'src/common/guards/ckeck-owner.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist, Wish]),
    forwardRef(() => UsersModule),
    forwardRef(() => WishesModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [WhishlistsController],
  // providers: [WhishlistsService, WishesService, OwnerCheckGuard],
  providers: [WhishlistsService],
  exports: [WhishlistsService],
})
export class WhishlistsModule {}
