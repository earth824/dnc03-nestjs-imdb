import { SetMetadata } from '@nestjs/common';
import { Role } from '../../user/user.entity.js';

export const ROLES_KEY = 'ROLES';
export const Roles = (...allowedRoles: Role[]) =>
  SetMetadata(ROLES_KEY, allowedRoles);
