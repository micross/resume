import * as v from 'valibot';

export const flagsSchema = v.object({
    is_email_auth_disabled: v.boolean(),
    is_signups_disabled: v.boolean(),
    open_sign: v.boolean(),
    open_comment: v.boolean(),
    open_person_in: v.boolean(),
    open_sign_in: v.boolean(),
    open_business: v.boolean(),
});

export type Flags = v.InferOutput<typeof flagsSchema>;