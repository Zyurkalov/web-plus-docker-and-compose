import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { MAP_EXCEPTION_TEXT } from 'src/constants/constants';

@Injectable()
export class UserAlreadyExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { username, email } = request.body;

    const queryConditions = [];
    if (username) queryConditions.push({ username });
    if (email) queryConditions.push({ email });

    const existingUser = await this.userService.findUserByFields(queryConditions);

    if (existingUser) {
      throw new ConflictException(MAP_EXCEPTION_TEXT.user.alreadyExists);
    }

    return true;
  }
}
