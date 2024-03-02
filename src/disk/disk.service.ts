import { Injectable } from '@nestjs/common';
import { PowerService } from '@app/power/power.service';

@Injectable()
export class DiskService {
  constructor(private readonly powerService: PowerService) {}

    getManufacturer() {
        return 'Seagate';
    }

    getDiskType() {
        return 'SSD';
    }

    getData() {
        console.log('Drawing 20 watts of power from Power service.')
        this.powerService.supplyPower(20);
        return 'Data!!!';
    }
}
