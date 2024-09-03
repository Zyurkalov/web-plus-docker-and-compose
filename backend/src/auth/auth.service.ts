import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { verifyHash } from 'src/common/helpers/hash';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const { username, id: sub } = user;
    // переименовали id в sub согласно документации
    return {
      access_token: this.jwtService.sign({ username, sub }),
    };
  }

  async validatePassword(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByQuery({
      select: { username: true, password: true, id: true },
      where: { username },
    });
    const chekingPassword = await verifyHash(password, user.password);

    if (user && chekingPassword) {
      return this.login(user);
    }
    throw new UnauthorizedException('Некорректный пароль');
  }
}
