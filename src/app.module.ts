import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MessagesModule } from './messages/messages.module';
import { ComputerModule } from './computer/computer.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  controllers: [AppController],
  imports: [MessagesModule, ComputerModule, UsersModule, ReportsModule],
})
export class AppModule {}
