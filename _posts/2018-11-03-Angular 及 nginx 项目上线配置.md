# 服务器防火墙和入栈规则设置
1. 允许远程连接
2. 添加入站规则

# 代理设置
我前台 ng-cli 端口是 8888，后台 nodejs 端口是 9999，**这时 nginx 不能直接代理 8888 端口**，设置 8888 端口的代理无效，因为端口冲突了。

这时在 ng-cli 中使用 proxy.conf.json 代理到随机端口 A，再在 nginx 中设置端口 A 的代理，配置如下：

``` conf
http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

	rewrite_log on;

    gzip  on;
	gzip_min_length 1k;
    gzip_buffers 4 8k;
    gzip_http_version 1.1;
    gzip_types text/plain application/javascript application/x-javascript text/javascript text/css application/xml;

    error_log logs/rewrite.log error;
	# CMIP prod
	server {
        listen       8887;
        server_name  localhost;

		#rewrite '^/CMIP/(.*)' /$1;
		# try_files $uri $uri/ /index.html;

		location ^~ /CMIP-backend/api/ {
			proxy_pass http://172.21.213.177:9999/CMIP-backend/api/;
			proxy_redirect off;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header Host $http_host;
			proxy_set_header X-NginX-Proxy true;
		}

		location ^~ /CMIP-backend/geoserver/ {
			proxy_pass http://172.21.213.177:8787/geoserver/;
			proxy_redirect off;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header Host $http_host;
			proxy_set_header X-NginX-Proxy true;
		}

		location ^~ /CMIP/ {
            # 先找 $uri, $uri/，匹配不到时，匹配 /CMIP/index.html（注意此处的前缀 '/CMIP' 和 location 的 $url 是对应的），如果还匹配失败，返回 404
			try_files $uri $uri/ /CMIP/index.html =404;
            # 注意静态资源的物理路径为 'F:/Angular/CMIP_frontend/build-prod/CMIP/index.html'，即 root 中的路径和 $uri 的前缀要组合起来
			root F:/Angular/CMIP_frontend/build-prod;
			index index.html;
		}
    }

	# CMIP prod-optimizer-mode
    server {
        listen       8886;
        server_name  localhost;

		#rewrite '^/CMIP/(.*)' /$1;
		#try_files $uri $uri/ /index.html;

		location ^~ /CMIP-backend/api/ {
			proxy_pass http://172.21.213.177:9999/CMIP-backend/api/;
			proxy_redirect off;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header Host $http_host;
			proxy_set_header X-NginX-Proxy true;
		}

		location ^~ /CMIP-backend/geoserver/ {
			proxy_pass http://172.21.213.177:8787/geoserver/;
			proxy_redirect off;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header Host $http_host;
			proxy_set_header X-NginX-Proxy true;
		}

		location ^~ /CMIP/ {
			try_files $uri $uri/ /CMIP/index.html =404;

			root F:/Angular/CMIP_frontend/build-prod-optimizer;
			index index.html;
		}
    }

	# wei tang
	server {
        listen       4303;
        server_name  localhost;

		error_log logs/rewrite.log error;

		rewrite '^/xcwtzzbrand/(.*)' /$1;
		try_files $uri $uri/ /index.html;

		location ~* {
			try_files $uri $uri/ /CMIP/index.html;
            root   F:/Angular/XCWTZZ-Client-Brand/dist;
            index  index.html;

		}

		# 前端静态资源
        #location ~* \.(html|css|js|png|jpg|gis|ico|flash|images|media|woff2|svg)$ {
        #    root   ../../build-prod;
        #    index  index.html;
        #}

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

# geoserver 配置
WFS 返回 JSON 配置模板（[参考](https://blog.csdn.net/mengdong_zy/article/details/51787799)）

# 参考
- [Nginx正则表达式](https://blog.csdn.net/xinzhifu1/article/details/59540505)
- [nginx正则说明](https://blog.csdn.net/gzh0222/article/details/7845981)
- [Nginx 教程二：利用nginx搭建静态文件服务、正向代理服务器、反向代理服务器](https://blog.csdn.net/Aeroleo/article/details/77921975)