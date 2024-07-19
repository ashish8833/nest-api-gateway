import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class LoginSerialization {

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({
    example: 'demo@email.com',
  })
  @Type(() => String)
  readonly email: string;

  @ApiProperty()
  userType: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
