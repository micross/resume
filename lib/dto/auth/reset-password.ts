import * as v from 'valibot';

export const resetPasswordSchema = v.object({
  token: v.string(),
  password: v.pipe(v.string(), v.minLength(6)),
});

export class ResetPasswordDto extends createDto(resetPasswordSchema) {}
