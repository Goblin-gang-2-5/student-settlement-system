FROM node:20
LABEL authors="sirok"
WORKDIR /app
COPY . .
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm build
# todo проверить работу
RUN pnpm prisma db pull
RUN pnpm generate-prisma-client
ENTRYPOINT ["pnpm", "start"]