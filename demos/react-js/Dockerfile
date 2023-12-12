# =>>> 构建阶段
# 以官方最新node镜像作为基础镜像
FROM node:latest as build-stage
WORKDIR /app

COPY package.json .

# RUN npm config set registry https://registry.npmmirror.com/
RUN npm install

COPY . .
RUN npm run build

# =>>> 发布阶段:nginx
FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/