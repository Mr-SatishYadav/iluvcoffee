/**
 * Bootstraps the application.
 */
import { NestFactory } from '@nestjs/core'; // Importing NestFactory from the '@nestjs/core' package.
import { AppModule } from './app.module'; // Importing the AppModule from the './app.module' file.
import { Logger } from '@nestjs/common'; // Importing the Logger from the '@nestjs/common' package.

/**
 * Function to bootstrap the application.
 */
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  }); // Creating a Nest application using the AppModule and passing options with 'snapshot' set to true.
  const logger = app.get(Logger); // Getting the Logger instance from the application.
  await app.listen(3000); // Starting the application to listen on port 3000.
  logger.log(`Application listening at ${app.getUrl()}`); // Logging the application URL.
};

bootstrap(); // Calling the bootstrap function to start the application.
