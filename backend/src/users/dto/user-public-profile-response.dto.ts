import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityForIdAndDate } from 'src/constants/entity/base-entity';
import {
  DEFAULT_VALUES,
  maxLength_about,
  maxLength_username,
  minLength,
} from 'src/constants/constants';
import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { Column } from 'typeorm';

// export class UserPublicProfileResponseDto extends PickType(User, [
//   'id',
//   'username',
//   'about',
//   'avatar',
//   'createdAt',
//   'updatedAt',
// ] as const) {}

export class UserPublicProfileResponseDto extends BaseEntityForIdAndDate {
  @ApiProperty({
    description: 'имя пользователя',
    example: DEFAULT_VALUES.user,
  })
  @IsNotEmpty()
  @IsString()
  @Length(minLength, maxLength_username)
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    description: 'информация об пользователе',
    example: DEFAULT_VALUES.about,
  })
  @Column({
    default: DEFAULT_VALUES.about,
  })
  @IsNotEmpty()
  @IsString()
  @Length(minLength, maxLength_about)
  about: string;

  @ApiProperty({
    description: 'аватар пользователя',
    example: DEFAULT_VALUES.avatar,
  })
  @Column({
    default: DEFAULT_VALUES.avatar,
  })
  @IsNotEmpty()
  @IsUrl()
  avatar: string;
}
