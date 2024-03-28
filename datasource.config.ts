import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = {
  synchronize: false,
  type: 'sqlite',
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  // migrationsRun: true,
  migrationsTableName: 'car_resale-migrations',
} as DataSourceOptions;

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      database: 'db.sqlite',
      synchronize: true,
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      database: 'test.sqlite',
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: true,
    });
    break;
  default:
    throw new Error('No database configuration for this environment');
}

export const dataSource = new DataSource(dbConfig);

export const TypeOrmConfig = TypeOrmModule.forRootAsync({
  useFactory: async (): Promise<TypeOrmModuleOptions> => ({
    ...dbConfig,
  }),
});
