#!/bin/sh

npx prisma migrate deploy

exec pnpm run start:prod