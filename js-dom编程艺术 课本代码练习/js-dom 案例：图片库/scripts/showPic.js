function showPic(whicpic){
	var source = whicpic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	var text = whicpic.getAttribute("title");
	var description = document.getElementById("description");
	description.firstChild.nodeValue = text;
}

function countBodyChildren(){
	//获取body元素，因为body元素是getElementsByTagName方法所返回的数组中的第一个元素
	var body_element = document.getElementsByTagName("body")[0];
	alert(body_element.childNodes.length);

	//nodeType获取节点类型，1为元素节点，2为属性节点，3为文本节点
	//alert(body_element.nodeType);
}


//让countBodyChildren函数在页面加载时被执行
window.onload = countBodyChildren;