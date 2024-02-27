import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MessagesModule } from './messages/messages.module';
import { ComputerModule } from './computer/computer.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AppController],
  imports: [MessagesModule, ComputerModule, UsersModule, ReportsModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [__dirname + '/**/*.entity{.ts}'],
    synchronize: true,
  })],
})
export class AppModule {}
