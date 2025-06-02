import * as v from 'valibot';

export const tagSchema = v.string();

export type Tag = v.InferOutput<typeof tagSchema>;