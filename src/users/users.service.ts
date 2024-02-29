import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
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
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  /**
   * Finds a user by ID.
   * @param id - The ID of the user to find.
   * @returns The found user.
   * @throws NotFoundException if the user is not found.
   */
  findOne(id: number) {
    if(!id) return null;
    const user = this.repo.findOneBy({ id: id });
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
    if (!user) {
      throw new NotFoundException(`user not found with provided id:${id}`);
    }
    Object.assign(user, data);
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
    if (!user) {
      throw new NotFoundException(`user not found with provided id:${id}`);
    }
    await this.repo.remove(user);
    return user;
  }
}
