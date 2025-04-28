import * as v from 'valibot';

export const memberTypeSchema = v.object({
  id: v.string(),
  name: v.string(),
  member_type: v.string(),
  original_price: v.number(),
  price: v.number(),
});

export type MemberType = v.InferOutput<typeof memberTypeSchema>;

export class MemberTypeDto extends createDto(memberTypeSchema) {}