/**
 * This file contains the unit tests for the AuthService class.
 * It tests the functionality of the authentication service, including user registration and login.
 */
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { scryptSync } from 'crypto';

const mockUser = {
  id: 1,
  email: 'test@example.com',
  password: 'password',
  created_at: new Date(),
  updated_at: new Date(),
} as User;

describe('AuthService', () => {
  let authService: AuthService;
  let mockUsersService: Partial<UsersService>;
  beforeEach(async () => {
    jest.clearAllMocks();
    mockUsersService = {
      find: () => Promise.resolve([]),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      create: (data: Partial<User>) =>
        Promise.resolve({ ...mockUser, ...data }) as Promise<User>,
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should throw BadRequestException if email is already in use', async () => {
      const email = 'test@example.com';
      const password = 'password';

      jest
        .spyOn(mockUsersService, 'find')
        .mockResolvedValue([mockUser] as User[]);

      await expect(authService.register(email, password)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should create a new user and return it', async () => {
      const email = 'test@example.com';
      const password = 'password';

      jest.spyOn(mockUsersService, 'find').mockResolvedValue([]);
      jest
        .spyOn(mockUsersService, 'create')
        .mockResolvedValue({ email } as User);

      const result = await authService.register(email, password);

      expect(mockUsersService.create).toHaveBeenCalledWith({
        email,
        password: expect.any(String),
      });
      expect(result).toEqual({ email });
    });

    it('creates a new user with a salted and hashed password', async () => {
      const email = 'test@test.com';
      const password = 'password';
      const user = await authService.register(email, password);

      expect(user).toBeDefined();
      expect(user.password).not.toEqual(password);

      const [salt, hash] = user.password.split('.');

      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    });
  });

  describe('login', () => {
    it('should throw NotFoundException if email is not found', async () => {
      const email = 'test@example.com';
      const password = 'password';

      jest.spyOn(mockUsersService, 'find').mockResolvedValue([]);

      await expect(authService.login(email, password)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if password is invalid', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user = { email, password: 'invalidPassword' };

      jest.spyOn(mockUsersService, 'find').mockResolvedValue([user] as User[]);

      await expect(authService.login(email, password)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return the user if email and password are valid', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const salt = 'as798dfa9s7';

      const hash = scryptSync(password, salt, 32).toString('hex');
      const user = { email, password: `${salt}.${hash}` };

      jest.spyOn(mockUsersService, 'find').mockResolvedValue([user] as User[]);

      const result = await authService.login(email, password);

      expect(result).toEqual(user);
    });
  });
});
