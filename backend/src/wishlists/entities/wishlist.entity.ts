import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

import { BaseEntityForIdAndDate } from 'src/constants/entity/base-entity';
import {
  DEFAULT_VALUES,
  maxLength_wishList,
  maxLength_wishname,
  minLength,
} from 'src/constants/constants';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';
import { WishPartical } from 'src/wishes/dto/wish-partical.dto';
import { UserPublicProfileResponseDto } from 'src/users/dto/user-public-profile-response.dto';

@Entity()
export class Wishlist extends BaseEntityForIdAndDate {
  @ApiProperty({ example: 'Название списка' })
  @IsString()
  @Length(0, maxLength_wishname)
  @Column()
  name: string;

  // description нет в описании API сервиса, но есть в вводном описании проекта
  @ApiProperty({
    description: 'Описание подборки',
    example: 'Что дарить на мой ДР',
  })
  @IsOptional()
  @Length(minLength, maxLength_wishList)
  @Column({ default: 'Что дарить на мой ДР' })
  description: string;

  @ApiProperty({
    description: 'Картинка списка',
    example: DEFAULT_VALUES.image,
  })
  @IsUrl()
  @IsNotEmpty()
  @Column({ default: DEFAULT_VALUES.image })
  image: string;

  @ApiProperty({
    type: () => UserPublicProfileResponseDto,
  })
  @ManyToOne(() => User, (owner) => owner.wishlists)
  owner: User;

  @ApiProperty({
    type: () => WishPartical,
    isArray: true,
  })
  @ManyToMany(() => Wish, { eager: true })
  @JoinTable()
  items: Wish[];
}
