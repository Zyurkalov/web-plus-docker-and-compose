import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    readonly wishService: WishesService,
    private readonly dataSource: DataSource,
  ) {}

  async create(user: User, createOfferDto: CreateOfferDto): Promise<any> {
    const { itemId, amount, hidden } = createOfferDto;
    const wish = await this.wishService.getOne(itemId);
    wish.raised += amount;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const createOffer: Offer = this.offersRepository.create({
        ...createOfferDto,
        item: wish,
        user: user,
        amount: amount,
        hidden: hidden,
      });
      const offer = await queryRunner.manager.save(createOffer);

      wish.offers.push(offer);
      await queryRunner.manager.save(wish);
      await queryRunner.commitTransaction();
      return offer;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getAll(): Promise<Offer[]> {
    return await this.findWithOption();
  }

  async getOne(offerId: number): Promise<Offer> {
    const wishList = await this.findWithOption(offerId);
    return wishList[0];
  }

  async findWithOption(id?: number) {
    const options: FindManyOptions<Offer> = {
      where: {
        hidden: true,
      },
      relations: [
        'user',
        'user.wishlists',
        'user.wishlists.owner',
        'user.wishlists.items',
        'user.wishes',
        'user.offers',
      ],
    };

    if (id !== undefined) {
      options.where = {
        id: id,
      };
    }
    return await this.offersRepository.find(options);
  }
}
