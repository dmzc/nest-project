# 基于一个基础镜像进行修改
FROM node:latest
# 指定工作目录
WORKDIR /static-server
# 把容器外的内容复制到容器
COPY . /static-server
RUN npm config set registry https://registry.npmmirror.com
# 在容器内执行的命令
RUN npm install -g http-server
# 声明当前容器要访问的网络端口
EXPOSE 8080
# 此处声明了volumn,计算运行没有指定-v,也会生成一个匿名目录挂载
VOLUME /static-server
# 容器启动时执行的命令
CMD  http-server -p 8080
