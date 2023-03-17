import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest<TUser = unknown>(err: unknown, user: unknown): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('Email or password is incorrect');
    }
    return user as TUser;
  }
}
