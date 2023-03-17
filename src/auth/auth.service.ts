import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneWithPass(email);
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
      return null;
    }
    delete user.hashedPassword;
    return user;
  }

  async login(user: User): Promise<object> {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    } as PayloadDto;

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
