import { Roles } from '../interfaces';

export class UserPayloadDto {
  userid: string;
  username: string;
  role: Roles[];
}
