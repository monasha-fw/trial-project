import { Role } from '../entities';

export interface IRoleRepository {
  addNewRole(name: string): Promise<Role>;

  getRoles(): Promise<Role[]>;
}
