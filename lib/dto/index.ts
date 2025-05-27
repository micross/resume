import * as v from 'valibot';

export * from "./auth";
export * from "./feature";
export * from "./secrets";
export * from "./statistics";
export * from "./user";

export const paginationSchema = v.object({
    page: v.optional(v.number(), 1),
    page_size: v.optional(v.number(), 12),
});
  
  export class PageDto extends createDto(paginationSchema) {}