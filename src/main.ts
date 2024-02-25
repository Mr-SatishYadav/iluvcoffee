import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule); // Create the app with NestFactory
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // Add a validation pipe to the app
  await app.listen(3000); // Listen on port 3000
}
bootstrap();
