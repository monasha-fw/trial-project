import { inject, injectable } from 'tsyringe';
import { IRoleRepository } from '../../core/repositories';
import { Role } from '../../core/entities';
import { RoleLocalDatasource } from '../datasources/remote_datasource/RoleLocalDatasource';

@injectable()
export class RoleRepository implements IRoleRepository {
  constructor(@inject('RoleLocalDatasource') private datasource: RoleLocalDatasource) {}

  addNewRole(name: string): Promise<Role> {
    return this.datasource.addNewRole(name);
  }

  getRoles(): Promise<Role[]> {
    return this.datasource.getRoles();
  }
}
