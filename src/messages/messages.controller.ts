import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

/**
 * Controller for managing messages.
 */
@Controller('messages')
/**
 * Controller class for managing messages.
 */
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  /**
   * Get a list of messages.
   * @returns A string representing the list of messages.
   */
  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  /**
   * Get a single message by ID.
   * @param id The ID of the message.
   * @returns A string representing a single message.
   */
  @Get('/:id')
  getMessage(@Param('id') id: string) {
    const message = this.messagesService.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found!');
    }
    return message;
  }

  /**
   * Create a new message.
   * @param body The body of the request.
   * @param body.content The content of the message.
   * @returns A string representing the created message.
   */
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  @Patch('/:id')
  updateMessage(@Param('id') id: string, @Body() body: CreateMessageDto) {
    return this.messagesService.update(id, body.content);
  }

  @Delete('/:id')
  deleteMessage(@Param('id') id: string) {
    const message = this.messagesService.delete(id);
    if (!message) {
      throw new NotFoundException('Message not found!');
    }
    return message;
  }
}
