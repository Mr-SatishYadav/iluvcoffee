import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ComputerModule } from './computer/computer.module';
import { MessagesModule } from './messages/messages.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

@Module({
  controllers: [AppController],
  imports: [
    MessagesModule,
    ComputerModule,
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
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
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({ keys: ['asdfasfs'] })).forRoutes('*');
  }
}
