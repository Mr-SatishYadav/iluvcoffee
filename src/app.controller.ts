import { Controller, Get } from '@nestjs/common';

@Controller() // Decorator for the controller class
export class AppController {
  // Controller class
  constructor() {} // Constructor

  // Get Method
  @Get() // Get Decorator for the method
  getRootRoute(): string {
    return 'Hello World!';
  }
}