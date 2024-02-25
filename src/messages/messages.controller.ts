import { Body, Controller, Get, Param, Post } from '@nestjs/common';

/**
 * Controller for managing messages.
 */
@Controller('messages')
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
   * @returns A string representing a single message.
   */
  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return 'A single message with the ID: ' + id;
  }

  /**
   * Create a new message.
   * @returns A string representing the created message.
   */
  @Post()
  createMessage(@Body() body: any) {
    return 'Create a message with the content: ' + body.content;
  }
}
