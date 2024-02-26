import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
    constructor(private readonly powerService: PowerService) {}
    getManufacturer() {
        return 'Intel';
    }
    
    getSpeed() {
        return '3.2 GHz';
    }
    
    getCoreCount() {
        return 4;
    }

    compute(a: number, b: number) {
        console.log('Drawing 100 watts of power from Power service.')
        this.powerService.supplyPower(100);
        return a + b;
    }
}
