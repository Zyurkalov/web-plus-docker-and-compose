import {
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntityForIdAndDate extends BaseEntity {
  @ApiProperty({
    description: 'уникальный идентификатор',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'дата создания',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'дата изменения',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
