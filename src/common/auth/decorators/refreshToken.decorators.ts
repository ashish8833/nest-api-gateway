import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtRefreshAuthGuar } from '../guards/jwt-refresh/jwt-refresh.guard';

export function RefreshTokenDecorators(): MethodDecorator {
  return applyDecorators(UseGuards(JwtRefreshAuthGuar));
}
