import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<object> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<User> {
    return req.user;
  }
}
