FROM node:19
LABEL authors="sirok"
WORKDIR /app
COPY . .
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm build
ENTRYPOINT ["pnpm", "start"]