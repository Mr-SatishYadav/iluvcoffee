var dbConfig = {};

switch (process.env.NODE_ENV) {
  case 'development':
    dbConfig = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
    break;
  case 'production':
    dbConfig = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
    break;
  default:
    dbConfig = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
    break;
}

module.exports = dbConfig;
