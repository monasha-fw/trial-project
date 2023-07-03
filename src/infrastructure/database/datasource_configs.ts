import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'myusername',
  password: 'mypassword',
  database: 'trail_project',
  entities: ['src/infrastructure/models/**/*.ts'],
  migrations: ['src/infrastructure/migration/**/*.ts'],
  subscribers: ['src/infrastructure/subscriber/**/*.ts'],
  synchronize: false,
  logging: false
});

export { AppDataSource };
