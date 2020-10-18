FROM node:14.13.1

LABEL maintainer="Arunagirinathan Rajan<arunagnz@gmail.com>"

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","start"]