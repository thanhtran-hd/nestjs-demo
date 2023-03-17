import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy, JwtStrategy } from './auth.strategy';
import { JwtConfigService } from '../module-options/module-options.service';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync({ useClass: JwtConfigService })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
