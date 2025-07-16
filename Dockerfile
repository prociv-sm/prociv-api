FROM node:23.11.1-alpine3.22 AS base

ENV NODE_ENV build

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

RUN apk add --no-cache openssl curl

# Install app dependencies
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# Bundle app source
COPY . .

RUN pnpm build

FROM base as prod-build

# Set the NODE_ENV to production
ENV NODE_ENV production
ENV TZ Europe/Rome

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

COPY --from=base /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

