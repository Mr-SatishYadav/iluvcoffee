import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

/**
 * Service responsible for handling user-related operations.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  /**
   * Creates a new user.
   * @param data - The data of the user to be created.
   * @returns The created user.
   */
  create(data: Partial<User>) {
    const user = this.repo.create({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return this.repo.save(user);
  }

  /**
   * Finds a user by ID.
   * @param id - The ID of the user to find.
   * @returns The found user.
   * @throws NotFoundException if the user is not found.
   */
  findOne(id: number) {
    const options = { where: { id } } as FindOneOptions<User>;
    const user = this.repo.findOne(options);
    if (!user) {
      throw new NotFoundException(`user not found with provided id:${id}`);
    }
    return user;
  }

  /**
   * Finds users by email.
   * @param email - The email of the users to find.
   * @returns The found users.
   * @throws NotFoundException if no users are found with the provided email.
   */
  find(email: string) {
    const options = { where: { email } } as FindManyOptions<User>;
    const users = this.repo.find(options);
    if (!users) {
      throw new NotFoundException(`user[s] not found with provided email:${email}`);
    }
    return users;
  }

  /**
   * Updates a user by ID.
   * @param id - The ID of the user to update.
   * @param data - The updated data of the user.
   * @returns The updated user.
   * @throws NotFoundException if the user is not found.
   */
  async update(id: number, data: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, { ...data, updated_at: new Date() });
    return this.repo.save(user);
  }

  /**
   * Removes a user by ID.
   * @param id - The ID of the user to remove.
   * @returns The removed user.
   * @throws NotFoundException if the user is not found.
   */
  async remove(id: number) {
    const user = await this.findOne(id);
    await this.repo.remove(user);
    return user;
  }
}
