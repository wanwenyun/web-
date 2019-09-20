function showPic(whichpic){
	//检查placeholder元素是否存在，若不存在则返回false
	if(!document.getElementById("placeholder")) return false;//“return false;”语句之后的代码不执
	var source = whichpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	//检查placeholder是否是图片
	if(placeholder.nodeName !="IMG") return false;
	placeholder.setAttribute("src",source);
	//检测是否存在description元素，若存在，则被更新，否则会被忽略
	if(document.getElementById("description")){
		//检查title是否不为空
		var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
		var description = document.getElementById("description");
		if(description.firstChild.nodeType == 3){
			description.firstChild.nodeValue = text;
		}
	}
	return true;//"return true;"语句之后的代码正常执行
}

//添加事件处理函数，把html节点上有关操作关联到onclick事件上
function prepareGallery(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i=0; i<links.length; i++){
		links[i].onclick = function(){
			//若不存在placeholder，让脚本平稳退化
			return !showPic(this);
		}
	}
}

function countBodyChildren(){
	//获取body元素，因为body元素是getElementsByTagName方法所返回的数组中的第一个元素
	var body_element = document.getElementsByTagName("body")[0];
	alert(body_element.childNodes.length);

	//nodeType获取节点类型，1为元素节点，2为属性节点，3为文本节点
	//alert(body_element.nodeType);
}


//让countBodyChildren函数在页面加载时被执行
//window.onload = countBodyChildren;


//弹性共享onload事件
function addloadEvent(func){
	var oldonload = window.onload;
	if(typeof window.onload != 'function'){
		window.onload = func;
	} else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}


addloadEvent(countBodyChildren);
addloadEvent(prepareGallery);