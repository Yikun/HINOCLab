1.Windows下安装nodejs,应该会自动配置环境变量
没有的话，在path里面加

	;C:\Program Files\nodejs\

这个时候，试下命令`node -v`应该就能输出版本号了
当然，你也可以使用`where node`看一看它在那个目录。

2.设置node全局库的目录的环境变量
就是你使用`node install -g`安装的库
这里说2个比较有用的库
node install -g surpervisor
node install -g express-generator

3.如果想要下载库的速度更快，可以更新下库的源
	npm config set registry http://registry.cnpmjs.org
	
4.安装项目的库
	cd E:\yikun\labs\HINOCLab
	npm install

5.node app.js
为了修改方便，可以用不用重启当即生效
	supervisor app.js
	
下次，运行的时候，只需要执行第五步就可以了

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
