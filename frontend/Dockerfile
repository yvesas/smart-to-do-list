# Dockerfile para Next.js (Frontend)
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build || true
EXPOSE 3000
CMD ["pnpm", "dev"]
