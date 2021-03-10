function ajax(url,method = 'GET', dataType = 'json',asycn = true) {
	return new Promise((resolve, reject) => {
		let xhr

		if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest()
		} else {
			xhr = ActiveXObject('Microsoft.XMLHTTP')
		}

		xhr.open(method, url, asycn)
		xhr.responseType = dataType

		xhr.onreadystatechange = () => {
			if(!/^[23]\d{2}$/.test(xhr.status)) return
			if(xhr.readyState === 4) {
				let result = xhr.responseText
				//根据dataType即不同的文件类型，对返回的内容做处理
				switch(this.dataType.toUpperCase()){
					case 'TEXT':
					case 'HTML':
						break;
					case 'JSON':
						result = JSON.parse(result)
						break;
					case 'XML':
						result = xhr.responseXML
				}
				resolve(result)
			}
		}

		xhr.onerror = (err) => {
			reject(err)
		}
		xhr.send()
	})
}
