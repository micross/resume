import * as v from 'valibot';

export const pptSchema = v.object({
  id: v.string(),
  category: v.array(v.string()),
  collections: v.number(),
  cover: v.array(v.string()),
  name: v.string(),
  effect: v.string(),
  pages: v.number(),
  profile: v.string(),
  proportion: v.string(),
  tags: v.array(v.string()),
  likes: v.number(),
  views: v.number(),
  downloads: v.number(),
  preview_url: v.array(v.string()),
  file_url: v.array(v.string()),
  created_at: v.date(),
  updated_at: v.date(),
});

export type PPT = v.InferOutput<typeof pptSchema>;