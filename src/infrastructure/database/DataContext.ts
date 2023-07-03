import { singleton } from 'tsyringe';
import { EntityManager } from 'typeorm';
import { AppDataSource } from './datasource_configs';
import { log } from '../../api/utils';

@singleton()
export class DataContext {
  private manager!: EntityManager;

  public async initialize() {
    if (!AppDataSource.isInitialized) {
      const dataSource = await AppDataSource.initialize();
      log.debug('DB Initialized');
      this.manager = dataSource.manager;
    }
  }

  public get db(): EntityManager {
    return this.manager;
  }
}
