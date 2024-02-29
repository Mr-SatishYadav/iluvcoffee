import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scryptSync } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(email: string, password: string): Promise<any> {
    const user = await this.usersService.find(email);
    if (user.length) {
      throw new BadRequestException('email in use');
    }
    
    const salt = randomBytes(8).toString('hex');
    const hash = scryptSync(password, salt, 32).toString('hex');
    const encryptedPassword = salt + '.' + hash;

    return await this.usersService.create({ email, password: encryptedPassword});
  }

  async login(email: string, password: string){
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('Invalid email');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = scryptSync(password, salt, 32).toString('hex');

    if (hash !== storedHash) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }
}
