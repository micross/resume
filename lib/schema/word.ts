import * as v from 'valibot';

export const wordSchema = v.object({
  id: v.string(),
  name: v.string(),
  category: v.array(v.string()),
  tags: v.array(v.string()),
  profile: v.string(),
  likes: v.number(),
  views: v.number(),
  downloads: v.number(),
  collections: v.number(),
  preview_url: v.array(v.string()),
  file_url: v.array(v.string()),
  created_at: v.date(),
  updated_at: v.date(),
});

export type Word = v.InferOutput<typeof wordSchema>;