import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  }); // Create the app with NestFactory
  app.use(
    cookieSession({
      keys: ['asdfasfs'],
    }),
  );
  await app.listen(3000); // Listen on port 3000
}
bootstrap();
