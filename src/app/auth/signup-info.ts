import { Role } from "../role/role";

export class SignUpInfo {
    id: number;
    name: string;
    username: string;
    email: string;
    role: Role;
    password: string;

    constructor(name: string, username: string, email: string, password: string,role: Role) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
