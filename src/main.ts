import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule); // Create the app with NestFactory
  await app.listen(3000); // Listen on port 3000
}
bootstrap();
