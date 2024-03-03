import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ComputerModule } from './computer/computer.module';
import { MessagesModule } from './messages/messages.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { APP_PIPE } from '@nestjs/core';

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
export class AppModule {}
