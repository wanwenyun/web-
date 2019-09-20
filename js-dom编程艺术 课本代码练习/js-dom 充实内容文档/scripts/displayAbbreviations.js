function displayAbbrevations(){
	if(!document.getElementsByTagName || !document.createElement ||!document.createTextNode) return false;
//获取abbr相关信息
	var abbrevations = document.getElementsByTagName("abbr");
	if(abbrevations.length < 1) return false;//如果文档里没有abbr元素，这个函数就此结束
	var defs = new Array();
	for (var i = 0; i < abbrevations.length; i++) {
		var curreent_abbr = abbrevations[i]
		if(curreent_abbr.childNodes.length<1) continus;//如果当前元素没有子节点就立即开始下一个循环
		var definition = curreent_abbr.getAttribute("title");//获取title属性值
		var key = curreent_abbr.lastChild.nodeValue;//获取文本节点
		//关联数组
		defs[key] = definition;
	}
//创建列表
	var dlist = document.createElement("dl");
	for (key in defs) {
		var definition = defs[key];
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if (dlist.childNodes.length < 1) return false;
//把列表插入文档
	var header = document.createElement("h2");
	var header_text = document.createTextNode("Abbrevations");
	header.appendChild(header_text);
	document.body.appendChild(header);
	document.body.appendChild(dlist);
}


addloadEvent(displayAbbrevations);