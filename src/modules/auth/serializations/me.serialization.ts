import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class MeSerialization {
  @ApiProperty({
    example: 'demo@email.com',
  })
  @Type(() => String)
  readonly email: string;

  @ApiProperty({
    example: 'Ashish',
  })
  @Type(() => String)
  readonly firstName: string;

  @ApiProperty({
    example: 'Kadam',
  })
  @Type(() => String)
  readonly lastName: string;
}
