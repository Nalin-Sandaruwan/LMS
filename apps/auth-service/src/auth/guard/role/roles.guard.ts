import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    // If no roles specified, allow access
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Set by JwtStrategy

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // Check if user's role is in required roles
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        `User role '${user.role}' is not authorized. Required roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
