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
