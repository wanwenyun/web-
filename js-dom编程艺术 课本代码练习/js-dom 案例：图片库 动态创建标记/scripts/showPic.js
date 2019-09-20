function showPic(whichpic){
	//检查placeholder元素是否存在，若不存在则返回false
	if(!document.getElementById("placeholder")) return true;//“return false;”语句之后的代码不执
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
	return false;//"return true;"语句之后的代码正常执行
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
			return showPic(this);
		}
		links[i].onkeypress = links[i].onclick;
	}
}

//动态创建<img>和<p>节点
function preparePlaceholder(){
	//判断浏览器是否支持这几个方法
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.jpg");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p")
	var desctext = document.createTextNode("choose a image");
	description.appendChild(desctext);
	// document.body.appendChild(placeholder);
	// document.body.appendChild(description);
	var gallery = document.getElementById("imagegallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
}


//js有把一个新元素插到一个现有元素前面的方法，insertBefore()
//但没有把新元素插到一个元素之后的方法
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement)
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);//nextSibling为目标元素的下一个兄弟元素
	}
}



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


addloadEvent(preparePlaceholder);
addloadEvent(prepareGallery);