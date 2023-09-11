import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (): Promise<string[]> => {
        const coffeeBrands = await Promise.resolve([
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
        ]);
        console.log('[!] Async factory')
        return coffeeBrands;
      },
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
