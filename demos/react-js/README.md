# demo react-js

## 部署

```sh
# 构建镜像
docker build -t fullstack/demo-react-js:nginx-v1 .

# 创建并运行容器
docker run -it -p 8081:80 --name demo-react-js-1 fullstack/demo-react-js:nginx-v1
```
