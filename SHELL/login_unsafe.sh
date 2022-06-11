#!/bin/env sh
# 此脚本为聊城大学2021年校园网自动登录的Shell脚本
# 项目地址为 https://github.com/rentianyu/LCU_WIFI
# 此脚本为未加密版，请注意安全，仅供学习交流使用
# 用法为wget --no-check-certificate https://raw.githubusercontent.com/rentianyu/LCU_WIFI/master/SHELL/login_unsafe.sh && bash login_unsafe.sh 账号 密码

if curl -s baidu.com | grep -q baidu; then
  echo "网络已登录，无需再次登录！"
else
  # 提取有关值
  u=$(curl -sL http://172.30.2.2:8088 | sed 's/.*nasip=\(\w\+\).*/\1/') &&
  # 进行登录
  curl -sd "userId=${1}&password=${2}&service=&queryString=nasip%253d${u}&operatorUserId=&passwordEncrypt=false" "http://172.30.2.2:8088/eportal/InterFace.do?method=login" | grep -q success &&
  echo "网络已成功登录" || echo "登录失败，请检查有关值是否填写错误"
fi