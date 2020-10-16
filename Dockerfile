FROM node:14.13.1

LABEL maintainer="arunagnz@gmail.com"

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm","start"]