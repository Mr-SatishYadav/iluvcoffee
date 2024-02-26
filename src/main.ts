import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Create the app with NestFactory
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // Add a validation pipe to the app
  await app.listen(3000); // Listen on port 3000
}
bootstrap();
