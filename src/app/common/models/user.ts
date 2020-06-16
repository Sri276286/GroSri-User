import { Role } from './role';

export class User {
    userId: number;
    username: string;
    mobile: string;
    email: string;
    password: string;
    role: Role;
    token?: string;
}
