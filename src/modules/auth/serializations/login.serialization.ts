import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class LoginSerialization {
  @ApiProperty({
    example: 'demo@email.com',
  })
  @Type(() => String)
  readonly email: string;

  @ApiProperty({
    example: 'Password',
  })
  @Type(() => String)
  readonly password: string;
}
