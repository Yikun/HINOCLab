这是一个简单的周报系统使用NodeJS(后端)、MongoDB(数据库)、前端(Bootstrap)，支持EJS、Markdown模板。

![preview](https://raw.githubusercontent.com/Yikun/HINOCLab/master/public/img/preview.png)

#### 1.安装

- Windows下安装nodejs,应该会自动配置环境变量
没有的话，在path里面加

	;C:\Program Files\nodejs\

- Linux下安装nodejs, 

	wget http://nodejs.org/dist/v0.10.32/node-v0.10.32-linux-x86.tar.gz
	tar -zxvf node-v0.10.32-linux-x86.tar.gz
	export PATH=XXX/node-v0.10.32-linux-x86/bin:$PATH
	
这个时候，试下命令`node -v`应该就能输出版本号了

当然，你也可以使用`where node`看一看它在那个目录。

#### 2.安装工具

就是你使用`npm install -gd`安装的库
这里说2个比较有用的库

	npm install supervisor -gd
	npm install express-generator -gd

Tips: 如果想要下载库的速度更快，可以更新下库的源

	npm config set registry https://registry.npm.taobao.org
	
#### 3.安装依赖库

	cd E:\yikun\labs\HINOCLab
	npm install

#### 4.启动程序

	node app.js

Tips: 为了修改方便，可以用不用重启当即生效

	supervisor app.js
	
下次，运行的时候，只需要执行第五步就可以了。

========================================================
下面可以看看

	├─package.json	包的需求，npm instal的时候，会根据这个来下载需要的包
	├─app.js			主程序
	├─model			数据库相关
	├─public			引用文件，运行后就是网站的根目录
	│  ├─css
	│  ├─fonts
	│  ├─img
	│  └─js
	├─routes			路由，网站的跳转
	├─test			里面有个excel的demo,node test.js 可以生成b.xlsx
	└─views			一些view文件，用jade模板写
		└─inc
		

