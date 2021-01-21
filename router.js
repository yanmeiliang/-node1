
//该脚本功能是完成项目的逻辑东西

var fs=require('fs');
var Student=require('./students');
// Express提供了一种更好的方式
//专门迎来包装路由的
var express=require('express');
//1、创建一个路由器
var router=express.Router();
//2、把路由挂在路由器中
//路由
//从文件中读取到的数据一定是字符串，所以这里一定要手动转成对象
   router.get('/students',(req,res)=>{
       Student.find(function (err,students) {
           if(err){
               return res.status(500).send('Server error');
           }
           res.render('index.html',{
               student:['姓名','性别','地址','爱好'],
               students:students
           });
       })

    })
    router.get('/students/new',(req,res)=>{
       res.render('new.html');

    });
   router.post('/students/new',(req,res)=>{
       //1 获取提交的数据
       var data=req.body;
        console.log(data);
     Student.save(data,function (err) {
     console.log(err);
       });
     res.redirect('/students');
    });
   router.get('/students/edit',(req,res)=>{

       Student.showData(parseInt(req.query.id),function (err,data) {
           if(err){
               return res.status(500).send('Server error');
           }
           res.render('edit.html',{
            student:data
           });
       })


    })
    router.post('/students/edit',(req,res)=>{
      var student=req.body;
        Student.updateByid(student,function (err) {
            if(err){
                return res.status(500).send('Server error');
            }
            res.redirect('/students');
        })



    });
    router.get('/students/delete',(req,res)=>{
        var id=req.query.id;
        Student.deleteByid(id,function (err) {
            if(err){
                return res.status(500).send('Server error');
            }
            res.redirect('/students');
        });

    });

//3、导出router
module.exports=router;
// module.exports=function (app) {
//     var fs=require('fs');

// }