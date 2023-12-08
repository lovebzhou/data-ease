# 以官方最新node镜像作为基础镜像
FROM node:latest

WORKDIR /app

COPY ./dist .

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "-p", "8080"]