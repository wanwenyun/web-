function getNewContent(){
	var request = getHTTPObject();
	if(request){
		request.open('GET',"example.txt",true);
		request.onreadstatechange = function(){
			if (request.readyState == 4){
				alert("response Received");
				var para = document.createElement("p");
				var txt = document.createTextNode(request.responseText);
				para.appendChild(txt);
				document.getElementById('new').appendChild(para);
			}
		};
		request.send(null);
	}else {
		alert('sorry,your brower does not support XMLHttprequest')
	}
	alert("function Done");
}

addloadEvent(getNewContent);