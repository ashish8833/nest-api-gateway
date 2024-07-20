import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAccessAuthGuard } from '../guards/jwt-access/jwt-access.guard';
import { UserStatus } from 'src/modules/auth/guards/userstatus.guard';

export function RoleAccessPermission(): MethodDecorator {
  return applyDecorators(UseGuards(JwtAccessAuthGuard, UserStatus));
}
