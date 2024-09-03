import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsJWT } from 'class-validator';

export class SigninUserResponseDto {
  @ApiProperty({
    example: '23bsdf243hjb123ah',
    description: 'access_token',
  })
  @IsNotEmpty()
  @IsJWT()
  access_token: string;
}
