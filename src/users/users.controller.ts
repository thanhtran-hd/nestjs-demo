import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDto, UpdateCatDto } from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    return user;
  }

  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<string> {
    return this.usersService.register(body);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCatDto): Promise<string> {
    return JSON.stringify(body);
  }
}
