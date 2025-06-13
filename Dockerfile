FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
RUN npm run build
RUN if [ "$NODE_ENV" = "production" ]; then npm prune --production; fi

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/build build/
COPY package.json .
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ARG PORT
ENV PORT=$PORT
EXPOSE $PORT
CMD [ "node", "build" ]