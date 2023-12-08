# 以官方最新node镜像作为基础镜像
FROM node:latest

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4200

# RUN npm dev
# CMD ["http-server", "-p", "4200"]
CMD ["npm", "run", "dev"]