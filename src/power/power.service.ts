import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  powerOn() {
    return 'Powering on...';
  }

  powerOff() {
    return 'Powering off...';
  }

  supplyPower(watts: number) {
    console.log(`Supplying ${watts} watts of power.`);
  }
}
