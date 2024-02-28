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

  async logout(user: any) {
    return {
      message: 'Logout successful',
      user,
    };
  }

  async forgotPassword(user: any) {
    return {
      message: 'Password reset link sent to your email',
      user,
    };
  }

  async resetPassword(user: any) {
    return {
      message: 'Password reset successful',
      user,
    };
  }

  async changePassword(user: any) {
    return {
      message: 'Password change successful',
      user,
    };
  }

  async verifyEmail(user: any) {
    return {
      message: 'Email verification successful',
      user,
    };
  }

  async resendVerificationEmail(user: any) {
    return {
      message: 'Verification email resent',
      user,
    };
  }

  async verifyMobile(user: any) {
    return {
      message: 'Mobile verification successful',
      user,
    };
  }

  async resendVerificationMobile(user: any) {
    return {
      message: 'Verification mobile resent',
      user,
    };
  }

  async socialLogin(user: any) {
    return {
      message: 'Social login successful',
      user,
    };
  }
}
