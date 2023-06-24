/**
 * 第一步：使用 (?=\d{3}$)，意思是“匹配到以三个数字结尾的位置”。 弄出最后一个逗号。
 * 第二步：使用量词 +，(?=(\d{3})+$)，弄出所有位置
 * 第三步：排除开头位置，(?!^)(?=(\d{3})+$)
 */
var regex = /(?!^)(?=(\d{3})+$)/g;
var result = "12345678".replace(regex, ',');

console.log(result);
// => "12,345,678"

let num = 123456789;
console.log(num.toFixed(2).replace(regex, ',').replace(/^/g, '$ '));