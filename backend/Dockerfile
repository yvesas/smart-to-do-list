# Dockerfile para NestJS (Backend)
FROM node:22-alpine
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
RUN pnpm install --frozen-lockfile

COPY . .

RUN npx prisma generate && \
    pnpm run build

EXPOSE 3001

# CMD ["pnpm", "start:dev"]
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]