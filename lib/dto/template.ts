import * as v from 'valibot';
import { templateSchema } from '../schema/template';

export const createTemplateSchema = v.partial(v.pick(templateSchema, [
    'id',
    'template_cover',
    'template_industry',
    'template_post',
    'template_status',
    'template_style',
    'template_title',
    'template_use',
    'template_views',
    'template_json',
]));

export class TemplateDto extends createDto(createTemplateSchema) {}