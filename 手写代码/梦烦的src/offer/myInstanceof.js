// TODO: 实现instanceOf
function myInstanceof(left, rigth) {
	const propotype = rigth.prototype
	// left = left.__proto__
	left = Object.getPrototypeOf(left)
	while (true) {
		if(left === propotype) return true
		if(left === null)  return false
		left = Object.getPrototypeOf(left)
	}
}


function Student(name, age) {
	this.name = name;
	this.age = age;
}
function Teacher(name, age) {
	this.name = name;
	this.age = age;
}
const a = new Student('LIN', 12);
console.log(myInstanceof(a, Student));
console.log(myInstanceof(a, Teacher));
