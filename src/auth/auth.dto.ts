import { ROLES } from '../core/enum';

export class PayloadDto {
  id: number;
  email: string;
  role: ROLES;
}
