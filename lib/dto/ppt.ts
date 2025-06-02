import * as v from 'valibot';
import { pptSchema } from '../schema/ppt';

export const pptListSchema = v.object({
    total: v.number(),
    list: v.array(pptSchema)
});

export class pptListDto extends createDto(pptListSchema) {}