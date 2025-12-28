FROM node:22-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /repo


FROM base AS prune
WORKDIR /repo

COPY turbo.json .
COPY pnpm-workspace.yaml .
COPY pnpm-lock.yaml .
COPY package.json .

COPY apps ./apps
COPY packages ./packages

RUN pnpm dlx turbo prune @apps/gateway --docker


FROM base AS build

WORKDIR /repo

COPY --from=prune /repo/out/json/ .
COPY --from=prune /repo/out/pnpm-lock.yaml .

RUN pnpm install --frozen-lockfile

COPY --from=prune /repo/out/full/ .

RUN pnpm turbo run build --filter=@apps/gateway...

RUN pnpm deploy --filter=@apps/gateway --prod /repo/deploy --legacy


FROM node:22-alpine AS runner
WORKDIR /repo

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=build /repo/deploy/node_modules ./node_modules
COPY --from=build /repo/apps/gateway/package.json .
COPY --from=build /repo/apps/gateway/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
