import { Module } from '@nestjs/common';
import { DiskService } from './disk.service';
import { PowerModule } from '@app/power/power.module';

@Module({
  providers: [DiskService],
  imports: [PowerModule],
  exports: [DiskService],
})
export class DiskModule {}
