import { Role } from '../../../core/entities';
import { injectable } from 'tsyringe';
import { DataContext } from '../../database';
import RoleModel from '../../models/auth/RoleModel';

export interface RoleLocalDatasource {
  addNewRole(name: string): Promise<Role>;

  getRoles(): Promise<Role[]>;
}

@injectable()
export class RoleLocalDatasourceImpl implements RoleLocalDatasource {
  constructor(private dbContext: DataContext) {}

  async addNewRole(name: string): Promise<Role> {
    /* saving new role */
    const addingData = new RoleModel();
    addingData.name = name;

    const role = await this.dbContext.db.save(addingData);
    return new Role(role.id, role.name);
  }

  async getRoles(): Promise<Role[]> {
    const roles = await this.dbContext.db.find(RoleModel);
    return roles.map((role) => new Role(role.id, role.name));
  }
}
