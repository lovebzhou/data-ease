FROM node:latest

WORKDIR /app

COPY . .

# RUN npm config set registry https://registry.npmmirror.com/
# RUN npm install -g http-server

RUN pnpm install

EXPOSE 7200

CMD ["http-server", "-p", "7200"]
