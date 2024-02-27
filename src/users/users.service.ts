import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  create(data: Partial<User>) {
    const user = this.repo.create({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return this.repo.save(user);
  }

  findOne(id: number) {
    const options = { where: { id } } as FindOneOptions<User>;
    return this.repo.findOne(options);
  }

  find(email: string) {
    const options = { where: { email } } as FindManyOptions<User>;
    return this.repo.find(options);
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`user not found with provided id:${id}`);
    }
    Object.assign(user, data);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`user not found with provided id:${id}`);
    }
    await this.repo.remove(user);
    return user;
  }
}
