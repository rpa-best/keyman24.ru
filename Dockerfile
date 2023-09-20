FROM node:lts-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY . .
# RUN  npm install

# COPY . .

RUN npm run build

ENV PORT 3000
