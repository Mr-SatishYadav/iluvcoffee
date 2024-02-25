import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private readonly messageRepository: MessagesRepository) {}

  /**
   * Returns all messages.
   * @returns An array of messages.
   */
  findAll() {
    return this.messageRepository.findAll();
  }

  /**
   * Creates a new message.
   * @param content - The content of the message.
   */
  create(content: string) {
    return this.messageRepository.create(content);
  }

  /**
   * Returns a specific message by its id.
   * @param id - The id of the message.
   * @returns The message with the specified id.
   */
  findOne(id: string) {
    return this.messageRepository.findOne(parseInt(id));
  }

  /**
   * Updates a specific message by its id.
   * @param id - The id of the message.
   * @param content - The new content of the message.
   */
  update(id: string, content: string) {
    return this.messageRepository.update(parseInt(id), content);
  }

  /**
   * Deletes a specific message by its id.
   * @param id - The id of the message.
   */
  delete(id: string) {
    return this.messageRepository.delete(parseInt(id));
  }
}
