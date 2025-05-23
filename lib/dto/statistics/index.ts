import * as v from 'valibot';

export const statisticsSchema = v.object({
  views: v.optional(v.number(), 0),
  downloads: v.optional(v.number(), 0),
});

export class StatisticsDto extends createDto(statisticsSchema) {}
