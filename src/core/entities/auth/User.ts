import { Role } from 'src/core/entities/index';

export default class User {
  id!: string;
  name!: string;
  email!: string;
  roles!: Role[];

  // status: ;

  constructor(id: string, name: string, email: string, roles: Role[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.roles = roles;
  }
}
