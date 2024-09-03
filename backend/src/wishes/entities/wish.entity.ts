import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';
import {
  maxLength_wishname,
  maxLength_description,
  minLength,
  DEFAULT_VALUES,
} from 'src/constants/constants';
import { BaseEntityForIdAndDate } from 'src/constants/entity/base-entity';
// import IWish from "src/constants/interface/wish";
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Wish extends BaseEntityForIdAndDate {
  @ApiProperty({ description: 'название подарка', example: 'мой подарок' })
  @IsString()
  @Length(minLength, maxLength_wishname)
  @Column()
  name: string;

  @ApiProperty({
    description:
      'ссылка на интернет-магазин, в котором можно приобрести подарок',
    example: DEFAULT_VALUES.image,
  })
  @IsUrl()
  @IsNotEmpty()
  @Column({ default: DEFAULT_VALUES.image })
  link: string;

  @ApiProperty({
    description: 'ссылка на изображение подарка',
    example: DEFAULT_VALUES.image,
  })
  @IsUrl()
  @IsNotEmpty()
  @Column({ default: DEFAULT_VALUES.image })
  image: string;

  @ApiProperty({
    description: 'стоимость подарка',
    example: 10_000,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(minLength)
  @IsNotEmpty()
  @Column()
  price: number;

  @ApiProperty({
    description: 'сумма которую пользователи сейчас готовы скинуть на подарок',
    example: 1_000,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(minLength)
  @Column({ default: 0 })
  raised: number;

  @ApiProperty({
    description: 'содержит cчётчик тех, кто скопировал подарок себе',
    example: 11,
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Column({ default: 0 })
  copied: number;

  @ApiProperty({ description: 'описание подарка' })
  @IsNotEmpty()
  @Length(minLength, maxLength_description)
  @Column()
  description: string;

  @ApiProperty({
    type: () => User,
  })
  // @Expose()
  @ManyToOne(() => User, (owner) => owner.wishes)
  // @Exclude({ toPlainOnly: true })
  owner: User;

  @ApiProperty({
    type: () => Offer,
    isArray: true,
  })
  @IsArray()
  @OneToMany(() => Offer, (offer) => offer.item)
  // @Exclude({ toClassOnly: true })
  offers: Offer[];
}
