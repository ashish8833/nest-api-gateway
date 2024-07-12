import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAccessAuthGuard } from '../guards/jwt-access/jwt-access.guard';

export function RoleAccessPermission(): MethodDecorator {
  return applyDecorators(UseGuards(JwtAccessAuthGuard));
}
