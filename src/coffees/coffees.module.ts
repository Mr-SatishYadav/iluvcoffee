import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entities';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useValue: [
        'Starbucks',
        "Dunkin'",
        "Peet's Coffee",
        'Lavazza',
        'Illy',
        'Blue Bottle Coffee',
        'Stumptown Coffee Roasters',
        'Death Wish Coffee',
        'Cafe Grumpy',
        'Counter Culture Coffee',
      ],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
