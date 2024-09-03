import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWhishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { WishesService } from 'src/wishes/wishes.service';
import { User } from 'src/users/entities/user.entity';
import { MAP_EXCEPTION_TEXT } from 'src/constants/constants';

@Injectable()
export class WhishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private wishesService: WishesService,
  ) {}

  async create(user: User, createWishlistDto: CreateWishlistDto) {
    const { itemsId, ...wishData } = createWishlistDto;
    const uniqueIds = this.getUniqueIds(itemsId);
    const wishes = await this.wishesService.findAllByArrayIds(uniqueIds);

    const wishesId = wishes.map((wish) => wish.id);
    await this.wishesService.incrementCopyCount(wishesId);

    const newWishlist = await this.wishlistRepository.create({
      ...wishData,
      owner: user,
      items: wishes,
    });
    return await this.wishlistRepository.save(newWishlist);
  }

  async findAll(): Promise<Wishlist[]> {
    return await this.wishlistRepository.find({ relations: ['owner'] });
  }

  async getOneOrThrow(id: number) {
    const findedWishList = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!findedWishList) {
      throw new NotFoundException(MAP_EXCEPTION_TEXT.itsNull);
    }
    return findedWishList;
  }

  async getOne(id: number) {
    return this.wishlistRepository.findOneOrFail({
      where: { id },
      relations: ['owner'],
    });
  }
  async findAllUserWishlists(username: string) {
    return this.wishlistRepository.find({
      where: { owner: { username } },
    });
  }

  async update(id: number, updateWhishlistDto: UpdateWhishlistDto) {
    const { itemsId, ...wishData } = updateWhishlistDto;

    const oldWishlist = await this.getOne(id);
    const { items, ...data } = oldWishlist;

    const currentWishIds = items.map((obj) => obj.id);
    // const uniqueIds = [...new Set(itemsId.map(value => value))];
    // const uniqueIds = this.getUniqueIds(itemsId)
    // const uniqueWishIds = uniqueIds.filter(num => !currentWishIds.includes(num));
    const uniqueWishIds = this.getUniqueWishIds(itemsId, currentWishIds);
    const newWishes = await this.wishesService.findAllByArrayIds(uniqueWishIds);

    await this.wishesService.incrementCopyCount(uniqueWishIds);
    return await this.wishlistRepository.save({
      ...data,
      ...wishData,
      items: items.concat(newWishes),
    });
  }

  getUniqueIds(id: number[]): number[] {
    return [...new Set(id.map((value) => value))];
  }
  getUniqueWishIds(id: number[], currentWishIds: number[]): number[] {
    const uniqueIds = this.getUniqueIds(id);
    return uniqueIds.filter((num) => !currentWishIds.includes(num));
  }

  async remove(id: number): Promise<Wishlist> {
    const removingWishlist = await this.getOne(id);
    return await this.wishlistRepository.remove(removingWishlist);
  }
}
