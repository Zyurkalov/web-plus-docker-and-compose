import { PickType, IntersectionType, PartialType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class CreateUserDto extends IntersectionType(
  PickType(User, ['username', 'email', 'password'] as const),
  PartialType(PickType(User, ['about', 'avatar'] as const)),
) {}
