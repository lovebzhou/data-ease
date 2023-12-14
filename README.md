# data-ease
a full stack demo project

## 概述

## 环境配置

### 部署

```sh
# 构建镜像
docker build -t fullstack/demo-react-ts:latest .

# 创建并启动容器
docker run -it -p 8080:80 --name demo-react-ts-1 fullstack/demo-react-ts

# 启动容器
docker start demo-react-js-1

# 停止容器
docker stop demo-react-js-1
docker kill demo-react-js-1

# 移除容器
docker rm demo-react-js-1
```

