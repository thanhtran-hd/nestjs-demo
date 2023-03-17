import { OmitType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(6)
  password: string;

  @IsString()
  fullname: string;
}

export class UpdateCatDto extends OmitType(CreateUserDto, ['email'] as const) {}
