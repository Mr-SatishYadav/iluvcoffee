import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entities';
import { Event } from 'src/events/entities/event.entity';

class MockCoffeesService {}
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [{ provide: CoffeesService, useValue: new MockCoffeesService() }],
  exports: [CoffeesService],
})
export class CoffeesModule {}
