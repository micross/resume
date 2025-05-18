import * as v from 'valibot';

export const meSchema = v.object({
  id: v.string(),
  name: v.string(),
  email: v.string(),
  avatar: v.string(),
  nickname: v.string(),
  date_of_birth: v.date(),
  account_id: v.string(),
  created_at: v.date(),
  updated_at: v.date(),
});

export type Me = v.InferOutput<typeof meSchema>;

export class MeDto extends createDto(meSchema) {}