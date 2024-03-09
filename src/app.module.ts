import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { TypeOrmConfig } from 'dataSource.config';
import { AppController } from './app.controller';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');


@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ReportsModule,
    TypeOrmConfig,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true, whitelist: true }),
    },
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({ keys: this.configService.get<string>('COOKIE_KEY') }),
      )
      .forRoutes('*');
  }
}
