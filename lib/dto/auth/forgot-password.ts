import * as v from 'valibot';

export const forgotPasswordSchema = v.object({ email: v.pipe(v.string(), v.email()) });

export class ForgotPasswordDto extends createDto(forgotPasswordSchema) {}
