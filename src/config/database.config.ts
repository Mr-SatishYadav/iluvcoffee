export default () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || '',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  synchronize: process.env.DB_SYNCHRONIZE || false,
  autoLoadEntities: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
});
