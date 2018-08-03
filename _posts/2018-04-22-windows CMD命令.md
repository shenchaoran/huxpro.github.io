# 查找占用端口

`netstat -ano|findstr "2345"`最后一列为pid
`tskill 2345`