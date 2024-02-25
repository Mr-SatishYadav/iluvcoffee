import { IsString } from 'class-validator';

export class CreateMessageDto {
    /**
     * The content of the message.
     */
    @IsString()
    content: string;
}
