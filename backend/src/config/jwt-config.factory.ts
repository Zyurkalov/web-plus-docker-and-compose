import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';

@Injectable()
export class JwtConfigFactory implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get<string>('jwt.secret'),
      signOptions: {
        expiresIn: this.configService.get<string>('jwt.ttl', '300s'),
      },
    };
  }
}
