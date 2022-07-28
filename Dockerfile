FROM node:latest

RUN npm install -g nodemon

WORKDIR /srv/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["nodemon", "app.ts"]