import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
@Module({
  // Decorator for the module class
  controllers: [AppController], // Module class
})
export class AppModule {}
