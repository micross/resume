import * as v from 'valibot';

export const authResponseSchema = v.object({
  status: v.picklist(["authenticated", "2fa_required"]),
  expire_in: v.number(),
  refresh_expire_in: v.number(),
  token: v.string(),
  refresh_token: v.string(),
});

export class AuthResponseDto extends createDto(authResponseSchema) {}
