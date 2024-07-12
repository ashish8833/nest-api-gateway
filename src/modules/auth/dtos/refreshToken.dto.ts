import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class DTORefreshToken {
  @ApiProperty({
    description: 'Refresh Token',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;

  @ApiProperty({
    description: 'Access Token',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  accessToken: string;
}
