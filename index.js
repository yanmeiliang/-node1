var express=require('express');
var path=require('path');

var app=express();
var bodyParser=require('body-parser');
//加载路由
var router=require('./router');

//配置post
app.use(bodyParser.urlencoded({extender:false}));
app.use(bodyParser.json());
//开放静态资源
app.use('/public/',express.static('./public/'));
app.use('/node_modules/',express.static('./node_modules/'));
//web框架，渲染模板
app.engine('html',require('express-art-template'));
app.set('views',path.join(__dirname,'view'));
//路由运行
app.use(router);
app.listen(3000,()=>{
    console.log("服务器启动");
})
