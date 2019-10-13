const fs = require('fs');

//readFile(文件名，回调函数)
// fs.readFile('./3/aaa.txt',function (err,data) {
//   if(err){
//     console.log("对不起")
//   }else{
//     console.log(data.toString());
//   }
// });
//writeFile(文件名，内容，回调函数);
fs.writeFile("./3/bbb.txt","djks5682",function (err) {
  console.log(err);
})
