import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.update(id, body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`user not found with provided id:${id}`);
    }
    return user;
  }

  @Get()
  async getAllUsers(@Query('email') email: string) {
    const users = await this.usersService.find(email);
    if (users.length === 0) {
      throw new NotFoundException(
        `user not found with provided email:${email}`,
      );
    }
    return users;
  }

  @Delete('/:id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
