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