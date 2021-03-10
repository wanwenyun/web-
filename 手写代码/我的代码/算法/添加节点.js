/** 
* 怎么在1和2之间添加节点
* <div id="1">eee</div>
* <div id="2">aaa</div>
* 
*/
function AddNode() {
	var el = document.createElement("div")
	el.innerHTML = 'bbb';
	var el2 = document.getElementById('2');
	el2.parentNode.insertBefore(el,el2);
}
AddNode();