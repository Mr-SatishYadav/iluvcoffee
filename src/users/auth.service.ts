import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { scryptSync } from 'crypto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(email: string, password: string): Promise<any> {
    const user = await this.usersService.find(email);
    if (user.length) {
      throw new BadRequestException('email in use');
    }

    return await this.usersService.create({ email, password });
  }

  async login(email: string, password: string) {
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
