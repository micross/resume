import * as v from 'valibot';

export * from "./auth";
export * from "./feature";
export * from "./secrets";
export * from "./statistics";
export * from "./user";

export const paginationSchema = v.object({
    page_cursor: v.optional(v.string()),
    limit: v.optional(v.number(), 20),
    page_back: v.optional(v.boolean(), false),
});
  
export class PageDto extends createDto(paginationSchema) {}