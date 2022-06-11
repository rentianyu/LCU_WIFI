#!/bin/env sh
# 此脚本为聊城大学2021年校园网自动登录的Shell脚本
# 此脚本仅供学习交流使用
# 用法为在登录前按F12抓包，登录成功后找 http://172.30.2.2:8088/eportal/success.jsp?userIndex**** 的Cookie，将所需值填入脚本内对应位置后运行脚本即可

# Cookie内EPORTAL_COOKIE_USERNAME值，即 学号，为10位
userId=2021*****8
# Cookie内EPORTAL_COOKIE_PASSWORD的值，即 新版密码加密后的值，为256位
password=66202****488b487

if curl -s baidu.com | grep -q baidu; then
  echo "网络已登录，无需再次登录！"
else
  # 编码有关值
  u=$(curl -sL http://172.30.2.2:8088 | sed 's/.*nasip=\(\w\+\).*/\1/') &&
  # 进行登录
  curl -sd "userId=${userId}&password=${password}&service=&queryString=nasip%253d${u}&operatorUserId=&passwordEncrypt=true" "http://172.30.2.2:8088/eportal/InterFace.do?method=login" | grep -q success &&
  echo "网络已成功登录" || echo "登录失败，请检查有关值是否填写错误"
fi