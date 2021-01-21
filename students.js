//该脚本要实现的是业务中要的增删改查，就是对数据进行增查改查，不要求是数据库或者文件
/*
student.js
数据操作文件模块
职责：操作文件中的数据，只处理数据，不关心业务
 */
//获取所有的学生列表
//回调函数获取异步数据
/*callback第一参数时err
第一个参数是err：成功是null，错误是错误对象
第二个参数是结果，成功是数组，错误是undefined
 */
var fs=require('fs');
var dpPath='./db.json';
exports.find=function (callback) {
    //;callback
    fs.readFile(dpPath,'utf8',(error,data)=>{
        if(error){
       return   callback(error);
        }
        //读处理时二进制
       callback(null,JSON.parse(data).students);
        })
}
//添加保存学生
exports.save=function (student,callback) {
    //1、读数据
    //读出的数据是二进制，要写是想要的，第二个参数就是utf-8，否则要data.toString()
    fs.readFile(dpPath,'utf8',(error,data)=>{
        if(error){
            //，调用和的时候就是看他呢，重要错误就是把错误对象传递给它
            return   callback(error);
        }
        //2、处理要写入的数据
         var students=JSON.parse(data).students;
        //处理id不重复问题
         student.id=parseInt(students[students.length-1].id)+1;
         students.push(student);
     //转换为字符串
    var fileData=JSON.stringify({
        students:students
    })
        //3、写入数据
        fs.writeFile(dpPath,fileData,function (err) {
            if(err){
                return callback(err);
            }
            //成功就没错，所以错误对象就是null
            callback(null);
        })
    })

}
//显示要修改的数据
exports.showData=function(id,callback){
    fs.readFile(dpPath,'utf8',(error,data)=>{
        if(error){
            return   callback(error);
        }
        var datas=JSON.parse(data).students;
        var dataId=datas.find((index)=> index.id==id);
        // //读处理时二进制
        callback(null,dataId);
    })
}
//更新学生
exports.updateByid=function (student,callback) {
  //根据修改的进行读数据进行更新
    fs.readFile(dpPath,'utf8',(error,data)=> {
        if (error) {
            return callback(error);
        }
        var datas = JSON.parse(data).students;
        var dataId = datas.find((index) => index.id == student.id);

        // //更新修改
        for (var key in student){
            dataId[key]=student[key];
        }
        var fileData=JSON.stringify({
            students:datas
        })
        //3、写入数据
        fs.writeFile(dpPath,fileData,function (err) {
            if(err){
                return callback(err);
            }
            //成功就没错，所以错误对象就是null
            callback(null);
        })
    })
}
//删除学生
exports.deleteByid=function (id,callback) {
    //1、读数据
    //读出的数据是二进制，要写是想要的，第二个参数就是utf-8，否则要data.toString()
    fs.readFile(dpPath,'utf8',(error,data)=>{
        if(error){
            //，调用和的时候就是看他呢，重要错误就是把错误对象传递给它
            return   callback(error);
        }
        var students=JSON.parse(data).students;
        //根据条件查找
      var deleteId=students.findIndex(function (item) {
            return item.id===parseInt(id);
    })

        //删除指定数组的元素
        students.splice(deleteId,1);
      //转换字符串
        var fileData=JSON.stringify({
            students:students
        })
        //3、写入数据
        fs.writeFile(dpPath,fileData,function (err) {
            if(err){
                return callback(err);
            }
            //成功就没错，所以错误对象就是null
            callback(null);
        })
    })
}