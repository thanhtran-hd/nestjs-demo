import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';
import { ROUNDS_NUMBER } from '../core/constant';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async findOneWithPass(email: string): Promise<User> {
    console.log('===========');
    console.log(email);

    return await this.usersRepo.findOne({
      where: {
        email,
      },
      select: ['id', 'email', 'fullname', 'hashedPassword', 'role'],
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepo.find();
    return users;
  }

  async register(createUserDto: CreateUserDto): Promise<string> {
    const duplicatedUser = await this.usersRepo.findOneBy({
      email: createUserDto.email,
    });
    if (duplicatedUser) {
      throw new BadRequestException('Email already existed');
    }

    const newUser = new User(createUserDto);
    newUser.hashedPassword = await bcrypt.hash(createUserDto.password, ROUNDS_NUMBER);
    await this.usersRepo.save(newUser);

    return 'Success';
  }
}
