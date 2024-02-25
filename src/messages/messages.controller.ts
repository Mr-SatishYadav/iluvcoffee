import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

/**
 * Controller for managing messages.
 */
@Controller('messages')
/**
 * Controller class for managing messages.
 */
export class MessagesController {
  /**
   * Get a list of messages.
   * @returns A string representing the list of messages.
   */
  @Get()
  listMessages() {
    return 'List of messages';
  }

  /**
   * Get a single message by ID.
   * @param id The ID of the message.
   * @returns A string representing a single message.
   */
  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return 'A single message with the ID: ' + id;
  }

  /**
   * Create a new message.
   * @param body The body of the request.
   * @param body.content The content of the message.
   * @returns A string representing the created message.
   */
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return 'Create a message with the content: ' + body.content;
  }
}
