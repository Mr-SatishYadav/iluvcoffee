import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

    create(data: Partial<User>) {
        const user = this.repo.create({...data, created_at: new Date(), updated_at: new Date()});
        return this.repo.save(user);
    }
}
