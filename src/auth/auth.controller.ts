import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../core/guards/local-auth.guards';
import { ROLES } from 'src/core/enum';
import { Authorized } from 'src/core/decorators/authorized.decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<object> {
    return this.authService.login(req.user);
  }

  @Authorized(ROLES.AUTHOR)
  @Get('profile')
  async getProfile(@Request() req): Promise<User> {
    return req.user;
  }
}
