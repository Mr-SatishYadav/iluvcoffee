import { Controller, Get, Post } from '@nestjs/common';

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
    getMessage() {
        return 'A single message';
    }

    /**
     * Create a new message.
     * @returns A string representing the created message.
     */
    @Post()
    createMessage() {
        return 'Create a message';
    }
}
