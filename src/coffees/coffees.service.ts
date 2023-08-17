import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with #${id} not found!!`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee: Coffee = {
      id: this.coffees[this.coffees.length].id + 1,
      ...createCoffeeDto,
    };
    this.coffees.push(coffee);
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffeeIndex = this.coffees.findIndex(
      (item) => item.id === +id,
    );
    if (existingCoffeeIndex !== -1) {
      this.coffees[existingCoffeeIndex] = {
        ...this.coffees[existingCoffeeIndex],
        ...updateCoffeeDto,
      };
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
