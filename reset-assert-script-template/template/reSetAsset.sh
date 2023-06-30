#!/bin/bash

config_file="$(dirname "$0")/config.yaml"
file_type=".css"
search_directory="<%= assertRoot %>"  # 初始化自定义查找的静态资源目录
script_directory="." # 静态资源存放的目录
# 执行 打包命令
npm run <%= buildScript %>

# 检查上一个命令的退出状态
if [ $? -eq 0 ]; then
    # 打包之后 内网访问ali静态资源
    # 读取配置文件
    echo "start script"
    while IFS=':' read -r key value; do
      if [[ ! -z $key && $key != "#"* ]]; then
        key=$(echo "$key" | tr -d '[:space:]')
        value=$(echo "$value" | tr -d '[:space:]')
        # 遍历文件夹和子文件夹，找出后缀为 .css 的文件
        find "$search_directory" -type f -name "*$file_type" | while read -r file; do
          echo "$file"
          echo -e "key: ${key} \n value: ${value}"
          # 转义键和值中的斜杠
          escaped_key=$(sed 's/\//\\&/g' <<< "$key")
          escaped_value=$(sed 's/\//\\&/g' <<< "$value")
          # 对文件内容进行替换
          # sed -i "s/{{$key}}/$value/g" "$file"
          sed -i "s#${escaped_key}#${escaped_value}#g" "$file"
          
          # 获取文件所在目录路径
          dir_path=$(dirname "$file")
          
          # 复制文件夹 资源文件夹中的所有文件到目标文件夹（如果存在同名文件则进行覆盖）
        find "$script_directory/localAssets" -mindepth 1 -maxdepth 1 -exec cp -f {} "$dir_path" \;
        done
      fi
    done < "$config_file"
    echo "end script"
else
    # npm run build 失败时的处理
    echo "npm run build 失败，无法执行脚本。"
fi
