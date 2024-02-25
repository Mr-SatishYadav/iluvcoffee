import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';

@Injectable()
export class MessagesRepository {
  /**
   * Returns all messages.
   * @returns An array of messages.
   */
  findAll() {
    const contents = readFileSync('messages.json', 'utf8');
    const messages: Record<number, string> = JSON.parse(contents);
    return messages;
  }

  /**
   * Creates a new message.
   * @param content - The content of the message.
   */
  create(content: string) {
    const messages = this.findAll();
    const id = Math.floor(Math.random() * 999);
    messages[id] = content;
    const newMessage = messages[id];
    writeFileSync('messages.json', JSON.stringify(messages));
    return { id, message: newMessage };
  }

  /**
   * Returns a specific message by its id.
   * @param id - The id of the message.
   * @returns The message with the specified id.
   */
  findOne(id: number) {
    const messages = this.findAll();
    const message = messages[id];
    if (!message) return;
    return { id, message: messages[id] };
  }

  /**
   * Updates a specific message by its id.
   * @param id - The id of the message.
   * @param content - The new content of the message.
   */
  update(id: number, content: string) {
    const messages = this.findAll();
    messages[id] = content;
    const updatedMessage = messages[id];
    writeFileSync('messages.json', JSON.stringify(messages));
    return { id, message: updatedMessage };
  }

  /**
   * Deletes a specific message by its id.
   * @param id - The id of the message.
   */
  delete(id: number) {
    const messages = this.findAll();
    const deletedMessage = messages[id];
    messages[id] = undefined;
    writeFileSync('messages.json', JSON.stringify(messages));
    if (!deletedMessage) return;
    return { id, message: deletedMessage };
  }
}
