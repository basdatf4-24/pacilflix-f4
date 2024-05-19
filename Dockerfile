# base node image
FROM node:22-bullseye-slim as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Consume build arguments for non-secret env vars
ARG SOURCE_REPO
ENV SOURCE_REPO=$SOURCE_REPO
ARG RELEASE_PACKAGE
ENV RELEASE_PACKAGE=$RELEASE_PACKAGE

# Install all node_modules, including dev
FROM oven/bun:1 as deps
WORKDIR /remixapp

ADD package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Setup production node_modules
FROM oven/bun:1 as production-deps

WORKDIR /remixapp

COPY --from=deps /remixapp/node_modules /remixapp/node_modules
ADD package.json bun.lockb ./
RUN bun install  --frozen-lockfile --production

# Build the app
FROM oven/bun:1 as build

WORKDIR /remixapp

COPY --from=deps /remixapp/node_modules /remixapp/node_modules

ADD . .
RUN bun run build

# Finally, build the production image with minimal footprint
FROM base

ENV PORT="8080"
ENV NODE_ENV="production"

WORKDIR /remixapp

COPY --from=production-deps /remixapp/node_modules /remixapp/node_modules
COPY --from=build /remixapp/build /remixapp/build
COPY --from=build /remixapp/server.mjs /remixapp/server.mjs
COPY --from=build /remixapp/package.json /remixapp/package.json

CMD ["npm", "start"]