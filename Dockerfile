FROM node:13 as builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY src src
COPY tsconfig.json ./
COPY schema.prisma ./

ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma2 generate
RUN npm run build

FROM node:13

WORKDIR /app

COPY --from=builder /app/dist .
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/schema.prisma .

ENV DATABASE_URL=$DATABASE_URL

RUN npm install --production
RUN npx prisma2 generate

EXPOSE 3000
CMD ["node", "app.js"]