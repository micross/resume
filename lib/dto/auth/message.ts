import * as v from 'valibot';

export const messageSchema = v.object({ message: v.string() });

export class MessageDto extends createDto(messageSchema) {}
