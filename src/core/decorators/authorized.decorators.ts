import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ROLES } from '../enum';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { RolesGuard } from '../guards/roles.guards';

export const ROLES_KEY = 'roles';

export function Authorized(...roles: ROLES[]): MethodDecorator & ClassDecorator {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(JwtAuthGuard, RolesGuard));
}
