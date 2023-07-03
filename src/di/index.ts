import { container } from 'tsyringe';
import { DataContext } from '../infrastructure/database';
import { AuthRepository, RoleRepository } from '../infrastructure/repositories';
import { AuthRemoteDatasourceImpl } from '../infrastructure/datasources';
import { RoleLocalDatasourceImpl } from '../infrastructure/datasources/remote_datasource/RoleLocalDatasource';

export default function registerDependencyInjection(): void {
  container.register('DataContext', { useClass: DataContext });
  // container.register('IHttpClient', { useClass: HttpClient });
  // container.register('HttpClient', { useClass: HttpClient });
  // Repositories
  container.register('IAuthRepository', { useClass: AuthRepository });
  container.register('IRoleRepository', { useClass: RoleRepository });
  // DataSources
  container.register('AuthRemoteDatasource', { useClass: AuthRemoteDatasourceImpl });
  container.register('RoleLocalDatasource', { useClass: RoleLocalDatasourceImpl });
}
