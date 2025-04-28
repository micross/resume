import * as v from 'valibot';

const authProvidersSchema = v.array(v.picklist(["email", "github", "google"]));

export class AuthProvidersDto extends createDto(authProvidersSchema) {}
