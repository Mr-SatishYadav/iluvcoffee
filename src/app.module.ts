import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MessagesModule } from './messages/messages.module';
import { ComputerModule } from './computer/computer.module';

@Module({
  controllers: [AppController],
  imports: [MessagesModule, ComputerModule],
})
export class AppModule {}
