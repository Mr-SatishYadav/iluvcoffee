import { Module } from '@nestjs/common';
import { ComputerController } from './computer.controller';
import { CpuModule } from '@app/cpu/cpu.module';
import { DiskModule } from '@app/disk/disk.module';

@Module({
  controllers: [ComputerController],
  imports: [CpuModule, DiskModule],
})
export class ComputerModule {}
