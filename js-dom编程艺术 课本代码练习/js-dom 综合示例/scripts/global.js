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

function addClass(element,value){
	if(!element.className){
		element.className = value;
	}else{
		newClassName = element.className;
		newClassName+= "";
		newClassName+= value;
		element.className = newClassName;
	}
}

function highlightPage() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;  
  var headers = document.getElementsByTagName('header');
  if (headers.length == 0) return false;
  var navs = headers[0].getElementsByTagName('nav');
  if (navs.length == 0) return false;
  
  var links = navs[0].getElementsByTagName("a");
  for (var i=0; i<links.length; i++) {
	  var linkurl;
	  for (var i=0; i<links.length; i++) {
	    linkurl = links[i].getAttribute("href");
	    if (window.location.href.indexOf(linkurl) != -1) {
	      links[i].className = "here";
	      var linktext = links[i].lastChild.nodeValue.toLowerCase();
	      document.body.setAttribute("id",linktext);
	    }
	  }
  }
}
function moveElement(elementID,final_x,final_y,interval) {
	if(!document.getElementById) return false;
	if(!document.getElementById("message")) return false;
	var elem = document.getElementById("message");
	if(elem.movement) clearTimeout(elem.movement);
	if(!elem.style.left) elem.style.left = "0px";
	if(!elem.style.top) elem.style.top = "0px";
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if(xpos == final_x && ypos == final_y) return true;
	if(xpos<final_x) xpos++;
	if(xpos>final_x) xpos--;
	if(ypos<final_y) ypos++;
	if(ypos>final_y) ypos--;
	elem.style.left = xpos+"px";
	elem.style.top = ypos+"px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	movement = setTimeout(repeat,interval);
}

addloadEvent(highlightPage);