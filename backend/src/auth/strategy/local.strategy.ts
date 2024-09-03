import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  validate(username: string, password: string): Promise<any> {
    const accessToken = this.authService.validatePassword(username, password);
    if (!accessToken) {
      throw new UnauthorizedException(
        'Неправильное имя пользователя или пароль',
      );
    }
    return accessToken;
  }
}
