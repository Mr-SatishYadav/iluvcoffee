import { Controller, Get } from '@nestjs/common';

@Controller('gym')
export class GymController {
  @Get()
  getGym(id: number) {
    return 'Hello from gym!' + id;
  }
}
