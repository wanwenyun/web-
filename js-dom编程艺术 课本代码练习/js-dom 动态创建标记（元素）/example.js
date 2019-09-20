window.onload = function(){
	//创建p元素
	var para = document.createElement("p");
	var txt1 = document.createTextNode("This is");
	var em = document.createElement("em");
	var txt2 = document.createTextNode("my");
	var txt3 = document.createTextNode("content.");
	para.appendChild(txt1);
	em.appendChild(txt2);
	para.appendChild(em);
	para.appendChild(txt3);
	var testdiv = document.getElementById("testdiv");
	//将p元素成为testdiv的子节点
	testdiv.appendChild(para);	
}