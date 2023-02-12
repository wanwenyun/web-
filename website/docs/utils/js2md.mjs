import fs from "fs";
import path from "path";

// 用于将之前的笔记中的.js转成.md文件，并且移动文件至该项目中
function walkSync(currentDirPath, targeDirPath, callback) {
  // http://nodejs.cn/api/fs.html#fsreaddirsyncpath-options
  // http://nodejs.cn/api/fs.html#class-fsdirent 新增于: v10.10.0
  fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach(function (
    dirent
  ) {
    var filePath = path.join(currentDirPath, dirent.name);
    // console.log("filePath:", filePath);
    // console.log(callback);
    if (dirent.isFile()) {
      callback(filePath, targeDirPath + "/" + dirent.name);
    } else if (dirent.isDirectory()) {
      if (!fs.existsSync(targeDirPath + "/" + dirent.name)) {
        fs.mkdirSync(targeDirPath + "/" + dirent.name);
      }
      walkSync(filePath, targeDirPath + "/" + dirent.name, callback);
    }
  });
}

// 从源文件的js -> 新路径的js
const js2md = (sourcePath, targetPath) => {
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath);
  }
  walkSync(sourcePath, targetPath, function (filePath, finalPath) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      // data 是二进制类型，需要转换成字符串
      //   console.log(data.toString());
      if (finalPath.endsWith(".js")) {
        fs.writeFile(
          finalPath.replace(".js", ".md"),
          "```javascript\n" + data.toString() + "\n```",
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );
      } else if (finalPath.endsWith(".md")) {
        fs.writeFile(finalPath, data.toString(), (err) => {
          if (err) {
            console.error(err);
          }
        });
      } else {
        fs.writeFile(finalPath, data, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    });
  });
};

// 前端框架移动举例
js2md("../../../前端框架", "../前端框架");
