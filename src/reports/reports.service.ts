import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { User } from '@app/users/entities/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  create(data: Partial<Report>, user: User) {
    const report = this.repo.create(data);
    report.user = user;
    console.log(user);
    return this.repo.save(report);
  }
}
