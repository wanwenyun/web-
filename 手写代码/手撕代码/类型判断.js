/**
 * 数据类型判断
 * @param obj
 * @returns {*}
 */
function getType(obj) {
	if(obj === null) {
		return 'null'
	}
	if(typeof obj !== 'object') {
		return typeof obj
	}

	const TYPE = {
		'[object Object]': 'object',
		'[object Array]': 'array',
		'[object Function]': 'function',
		'[object Boolean]': 'object - boolean',
		'[object Number]': 'object - number',
		'[object String]': 'object - string',
	}
	return TYPE[Object.prototype.toString.call(obj)]
}




