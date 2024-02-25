import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
    /**
     * Array of messages.
     */
    messages = [
        'Hello NestJS!',
        'Hello again!',
        'Hello one more time!',
    ];
    
    /**
     * Returns all messages.
     * @returns An array of messages.
     */
    findAll(): string[] {
        return this.messages;
    }
    
    /**
     * Creates a new message.
     * @param content - The content of the message.
     */
    create(content: string) {
        this.messages.push(content);
    }

    /**
     * Returns a specific message by its id.
     * @param id - The id of the message.
     * @returns The message with the specified id.
     */
    findOne(id: number) {
        return this.messages[id];
    }

    /**
     * Updates a specific message by its id.
     * @param id - The id of the message.
     * @param content - The new content of the message.
     */
    update(id: number, content: string) {
        this.messages[id] = content;
    }

    /**
     * Deletes a specific message by its id.
     * @param id - The id of the message.
     */
    delete(id: number) {
        this.messages.splice(id, 1);
    }
}
