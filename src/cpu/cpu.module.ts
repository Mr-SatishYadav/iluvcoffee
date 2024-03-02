import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from '@app/power/power.module';

@Module({
  providers: [CpuService],
  imports: [PowerModule],
  exports: [CpuService],
})
export class CpuModule {}
