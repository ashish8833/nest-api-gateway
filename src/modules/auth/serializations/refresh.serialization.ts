import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RefreshSerialization {
  @ApiProperty({
    description: 'Refresh Token',
    required: true,
  })
  @Type(() => String)
  readonly refreshToken: string;

  @ApiProperty({
    description: 'Access Token',
    required: true,
  })
  @Type(() => String)
  readonly accessToken: string;
}
