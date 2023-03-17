import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy as StrategyOfJwt } from 'passport-jwt';
import { Strategy as StrategyOfLocal } from 'passport-local';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { User } from '../users/users.entity';
import { PayloadDto } from './auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(StrategyOfJwt) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: PayloadDto): Promise<object> {
    return { userId: payload.id, email: payload.email, role: payload.role };
  }
}

@Injectable()
export class LocalStrategy extends PassportStrategy(StrategyOfLocal) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    return user;
  }
}
