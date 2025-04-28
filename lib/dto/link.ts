import * as v from 'valibot';
import { linkSchema } from '../schema/link';

export const createLinkSchema = v.partial(v.pick(linkSchema, [
  'name',
  "link"
]));

export class LinkDto extends createDto(createLinkSchema) {}