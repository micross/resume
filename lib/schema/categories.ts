import * as v from 'valibot';
import { idSchema } from './id';

export const categoriesSchema = v.object({
    id: idSchema,
    module: v.string(),
    name: v.string(),
    created_at: v.date(),
    updated_at: v.date(),
});

export type Category = v.InferOutput<typeof categoriesSchema>;