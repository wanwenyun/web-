const http = require('http');

http.createServer(function (req,res) {
  var GET={};
  console.log(req.url);
  if(req.url.indexOf('?')!=-1){
    var arr = req.url.split('?');
    var url = arr[0];
    //arr[0]=>地址  '/aaa'
    //arr[1]=>数据  'user=wanwan&pass=123'
    var arr2 = arr[1].split('&');
    //arr2=['user=wanwan','pass=123']
    for (var i = 0; i < arr2.length; i++) {
      var arr3 = arr2[i].split('=');
      GET[arr3[0]]=arr3[1];
    }
  }else {
    var url = req.url;
  }


  console.log(url,GET);


  //req获取前台的请求数据
  res.write('aaa');
  res.end();
}).listen(8080);
