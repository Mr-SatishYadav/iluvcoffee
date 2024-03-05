import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { Repository } from 'typeorm';
import { User } from '@app/users/entities/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

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

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOneBy({ id });
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approved;
    return this.repo.save(report);
  }

  createEstimate({ make, model, year, mileage, lat, lng }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved = true')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
