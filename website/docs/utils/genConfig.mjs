// 用于生成.vitepress/config.js中的sidebar，即网站的侧边栏
import fs from "fs";
import path from "path";

function getAllSideBar(dir) {
  let filesNameArr = [];
  let cur = 0;
  // 用个hash队列保存每个目录的深度
  var mapDeep = {};
  mapDeep[dir] = 0;
  // 先遍历一遍给其建立深度索引
  function getMap(dir, curIndex) {
    var files = fs.readdirSync(dir); //同步拿到文件目录下的所有文件名
    files.map(function (file) {
      //var subPath = path.resolve(dir, file) //拼接为绝对路径
      var subPath = path.join(dir, file); //拼接为相对路径
      var stats = fs.statSync(subPath); //拿到文件信息对象
      // 必须过滤掉node_modules文件夹
      if (file != "node_modules") {
        mapDeep[file] = curIndex + 1;
        if (stats.isDirectory()) {
          //判断是否为文件夹类型
          return getMap(subPath, mapDeep[file]); //递归读取文件夹
        }
      }
    });
  }
  getMap(dir, mapDeep[dir]);
  function readdirs(dir, folderName, myroot) {
    var result = {
      //构造文件夹数据
      // path: dir,
      text: path.basename(dir),
      collapsible: true,
      collapsed: false,
      // deep: mapDeep[folderName],
    };
    var files = fs.readdirSync(dir); //同步拿到文件目录下的所有文件名
    result.items = files.map(function (file) {
      //var subPath = path.resolve(dir, file) //拼接为绝对路径
      var subPath = path.join(dir, file); //拼接为相对路径
      var stats = fs.statSync(subPath); //拿到文件信息对象
      if (stats.isDirectory()) {
        //判断是否为文件夹类型
        return readdirs(subPath, file, file); //递归读取文件夹
      }
      if (subPath.indexOf(".md") === -1) {
        return null;
      }
      return {
        //构造文件数据
        text: subPath
          .split("/")
          [subPath.split("/")?.length - 1].replace(".md", ""),
        link: subPath.replace("../", "/"),
      };
    });
    result.items = result.items.filter((item) => item);
    return result.text === "picture" ? null : result; //返回数据
  }
  filesNameArr.push(readdirs(dir, dir));
  return filesNameArr;
}

const data = {
  sidebar: {},
};
const dir = ["算法", "js", "前端框架", "工程化"];
dir.forEach((item, index) => {
  const res = getAllSideBar(`../${item}`);
  data.sidebar[`/${item}`] = [];
  const tmpArr = [];
  res[0].items.forEach((item) => {
    tmpArr.push(item);
  });
  data.sidebar[`/${item}`] = tmpArr;
});

console.log(JSON.stringify(data.sidebar));
