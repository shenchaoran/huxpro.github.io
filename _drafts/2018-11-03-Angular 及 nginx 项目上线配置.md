# 服务器防火墙和入栈规则设置
1. 允许远程连接
2. 添加入栈规则

# 代理设置
我前台 ng-cli 端口是 8888，后台 nodejs 端口是 9999，**这时 nginx 不能直接代理 8888 端口**，设置 8888 端口的代理无效，因为端口冲突了。

这时在 ng-cli 中使用 proxy.conf.json 代理到随机端口 A，再在 nginx 中设置端口 A 的代理，配置如下：
``` conf

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    gzip  on;
	gzip_min_length 1k;
    gzip_buffers 4 8k;
    gzip_http_version 1.1;
    gzip_types text/plain application/javascript application/x-javascript text/javascript text/css application/xml;
	
	# comparison: dev-mode，假设这里前后端端口不同
	server {
		listen 3865;
		server_name localhost;
		
		location ^~ /geoserver/ {
			proxy_pass http://127.0.0.1:8787/geoserver/;
			proxy_redirect off;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header Host $http_host;
			proxy_set_header X-NginX-Proxy true;
		}
		
		location ^~ /api/ {
			proxy_pass http://127.0.0.1:9999/api/;
			proxy_redirect off;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header Host $http_host;
			proxy_set_header X-NginX-Proxy true;
		}
	}
	
	# comparison: prod-mode，假设这里前后端共用同一个端口
	server {
        listen       8887;
        server_name  localhost;

        location ~* \.(html|css|js|png|jpg|gis|ico|flash|images|media|woff2)$ {
            root   F:/Angular/model_comparison_frontend/build-prod;
            index  index.html;
        }
		
		location ^~ /api/ {
			proxy_pass http://127.0.0.1:9999/api/;
			proxy_redirect off;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header Host $http_host;
			proxy_set_header X-NginX-Proxy true;
		}
		
		location ^~ /geoserver/ {
			proxy_pass http://127.0.0.1:8787/geoserver/;
			proxy_redirect off;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header Host $http_host;
			proxy_set_header X-NginX-Proxy true;
		}
		
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

# 参考
- [Nginx正则表达式](https://blog.csdn.net/xinzhifu1/article/details/59540505)
- [nginx正则说明](https://blog.csdn.net/gzh0222/article/details/7845981)
- [Nginx 教程二：利用nginx搭建静态文件服务、正向代理服务器、反向代理服务器](https://blog.csdn.net/Aeroleo/article/details/77921975)