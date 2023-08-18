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

  findOne(id: number) {
    const coffee = this.coffees.find((item) => item.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with #${id} not found!!`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee: Coffee = {
      id: this.coffees[this.coffees.length - 1]?.id + 1 || 1,
      ...createCoffeeDto,
    };
    this.coffees.push(coffee);
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
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

  remove(id: number) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
