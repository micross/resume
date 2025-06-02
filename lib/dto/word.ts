import * as v from 'valibot';
import { wordSchema } from '../schema/word';

export const wordListSchema = v.object({
    total: v.number(),
    list: v.array(wordSchema)
});

export class wordListDto extends createDto(wordListSchema) {}