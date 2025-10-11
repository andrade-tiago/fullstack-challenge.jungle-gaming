FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install -g turbo && turbo prune --scope=@apps/auth-ms --docker

WORKDIR /app/out/full
RUN npm install && npm run build --filter=@apps/auth-ms

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/out/full/ .
WORKDIR /app/apps/auth-ms
CMD ["node", "dist/main.js"]
