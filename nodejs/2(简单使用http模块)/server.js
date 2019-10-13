const http = require('http');

//创建服务器
var server = http.createServer(function(req,res){
  //console.log('有人来了');
  res.write("haha");
  res.end();
});

//监听
//端口——类似门牌号（80-web，110-邮件，3306-数据库）
server.listen(8010);
