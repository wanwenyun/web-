function positionMessage(argument) {
	if(!document.getElementById) return false;
	if(!document.getElementById("message")) return false;
	var elem = document.getElementById("message");
	elem.style.position = "absolute";
	elem.style.left = "50px";
	elem.style.top = "100px"; 
	moveElement("message",125,125,10);

/*	if(!document.getElementById("mess")) return false;
	var elem = document.getElementById("mess");
	elem.style.position = "absolute";
	elem.style.left = "50px";
	elem.style.top = "50px"; 
	moveElement("mess",125,125,20);*/
}

addloadEvent(positionMessage);