import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';

@Controller('computer')
export class ComputerController {
  constructor(
    private readonly cpuService: CpuService,
    private readonly diskService: DiskService,
  ) {}

    @Get()
    run() {
        console.log('Computer is running.');
        console.log('CPU manufacturer:', this.cpuService.getManufacturer());
        console.log('Disk type:', this.diskService.getDiskType());
        console.log('CPU speed:', this.cpuService.getSpeed());
        console.log('CPU core count:', this.cpuService.getCoreCount());
        console.log('Disk manufacturer:', this.diskService.getManufacturer());
        console.log('Disk is reading data.');
        console.log('CPU is processing data.');
        return [this.cpuService.compute(1, 2), this.diskService.getData()];
    }
}
