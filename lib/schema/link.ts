import * as v from 'valibot';

export const linkSchema = v.object({
  link: v.string(),
  name: v.string(),
});

export type Link = v.InferOutput<typeof linkSchema>;
