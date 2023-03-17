import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mariadb',
      host: this.config.get('DB_HOST', 'localhost'),
      port: +this.config.get('DB_PORT', 3306),
      database: this.config.get('DB_NAME', 'mariadb'),
      username: this.config.get('DB_USER', 'root'),
      password: this.config.get('DB_PASSWORD'),
      logging: true,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private config: ConfigService) {}

  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.get('JWT_SECRET_KEY'),
      signOptions: { expiresIn: this.config.get('JWT_EXPIRATION', '180s') },
    };
  }
}
