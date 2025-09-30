# Dependencies
FROM node:20 AS deps
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/gateway/package.json ./apps/gateway/
COPY packages ./packages

RUN npm install --workspaces --legacy-peer-deps

# Build
FROM node:20 AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY apps/gateway ./apps/gateway

WORKDIR /app/apps/gateway
RUN npm run build

# Runtime
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/gateway/dist ./dist

CMD ["node", "dist/main.js"]
