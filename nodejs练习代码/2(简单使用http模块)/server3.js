const http = require('http');

//创建服务器
var server = http.createServer(function(req, res) {
  console.log(req.url);
  switch (req.url) {
    case '/1.html':
      res.write("1111");
      break;
    case '/2.html':
      res.write("4");
      break;
    default:
      res.write("404");
      break;
  }
  res.write("haha");
  res.end();
});

//监听
//端口——类似门牌号（80-web，110-邮件，3306-数据库）
server.listen(8100);
