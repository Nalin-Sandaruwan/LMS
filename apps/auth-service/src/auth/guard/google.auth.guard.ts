import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  getAuthenticateOptions(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const path = request.path;
    
    // Determine role from the request path
    const role = path.includes('teacher') ? 'teacher' : 'user';
    
    return {
      state: role,
    };
  }
}
