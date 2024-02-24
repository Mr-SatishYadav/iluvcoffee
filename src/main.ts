import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Create the app with NestFactory
  await app.listen(3000); // Listen on port 3000
}
bootstrap();
