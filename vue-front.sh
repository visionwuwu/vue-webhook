#!/bin/bash
WORK_PATH='/root/user/projects/vue-front'
cd $WORK_PATH
echo '先清除老的代码'
# 回退历史区域回到暂存区
git reset --hard origin main
# 本地文件清除 未提交到暂存区域 保证代码干净
git clean -f
echo '拉取最新的代码'
git pull origin main
echo '打包代码'
npm run build
echo '开始执行构建'
# 用docker进行构建 镜像来源于别人的仓库 也可以自行构建写个文件Dockerfile
# .代码到当前的目录去找Dockerfile文件 -t vue-back指定构建镜像的名字叫vue-back
docker build -t vue-front:1.0 .
echo '停止旧容器并删除旧容器'
docker stop vue-front-container
docker rm vue-front-container
echo '启动新容器'
# 容器是单独的服务器 80:80端口映射将我的服务器的80端口映射到容器的80端口
# 下面无非就是一个启动docker容器的命令
docker container run -p 80:80 --name vue-front-container -d vue-front:1.0
