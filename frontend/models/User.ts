import { Role } from './Role';

export interface User {
  id: number;
  username: string;
  name: string;
  hashedPassword?: string;
  roles: Role[];
  profilePicture: number[];
  version: number;
}