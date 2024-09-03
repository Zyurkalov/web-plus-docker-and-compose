import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityForIdAndDate } from 'src/constants/entity/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Offer extends BaseEntityForIdAndDate {
  @ApiProperty({ description: 'Сумма заявки', example: false })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Column()
  amount: number;

  @ApiProperty({
    description: 'Флаг, который определяет показывать ли информацию',
    default: false,
  })
  @IsBoolean()
  @Column()
  hidden: boolean;

  @ApiProperty({
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.offers, { eager: true })
  user: User;

  @ApiProperty({
    type: () => Wish,
  })
  @ManyToOne(() => Wish, (item) => item.id)
  item: Wish;
}
