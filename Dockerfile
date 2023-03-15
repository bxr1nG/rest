FROM node:lts-alpine

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

COPY /packages/server/package.json /app/packages/server/package.json

COPY /packages/client/package.json /app/packages/client/package.json

RUN npm install

COPY . .

RUN npm run build &&\
    rm -rf packages/*/src packages/*/tsconfig.json packages/client/webpack.*.ts tsconfig.json

EXPOSE 80

ENV NODE_ENV=production

CMD ["node", "packages/server/build/index.js"]