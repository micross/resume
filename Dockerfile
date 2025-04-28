FROM oven/bun:1.2-alpine AS base

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

FROM oven/bun:1.2-alpine

WORKDIR /app

COPY --from=base /app/.output .


CMD ["bun", "./server/index.mjs"]
