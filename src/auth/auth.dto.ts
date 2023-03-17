import { Roles } from '../core/enum';

export class PayloadDto {
  id: number;
  email: string;
  role: Roles;
}
