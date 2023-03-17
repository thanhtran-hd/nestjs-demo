import { Roles } from '../core/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  hashedPassword: string;

  @Column()
  fullname: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.AUTHOR })
  role: Roles;
}
