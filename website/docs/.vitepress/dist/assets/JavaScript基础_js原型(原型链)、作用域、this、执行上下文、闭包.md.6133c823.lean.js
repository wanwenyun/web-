import{_ as e,o as t,c,z as n,a as s,G as l,B as o,V as p,D as r}from"./chunks/framework.75331a37.js";const y="/assets/proto.f8eab9e3.png",P=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"JavaScript基础/js原型(原型链)、作用域、this、执行上下文、闭包.md","filePath":"JavaScript基础/js原型(原型链)、作用域、this、执行上下文、闭包.md"}'),F={name:"JavaScript基础/js原型(原型链)、作用域、this、执行上下文、闭包.md"},D=p("",15),i=n("strong",null,"定义",-1),A=n("li",null,"动态作用域：函数的作用域是在函数调用的时候才决定的。 例子：",-1),C=p("",1),u=n("strong",null,"静态作用域",-1),h=n("strong",null,"1",-1),d=n("strong",null,"动态作用域",-1),g=n("strong",null,"2",-1),f=p("",72);function b(E,m,v,_,q,k){const a=r("font");return t(),c("div",null,[D,n("ul",null,[n("li",null,[s("词法(静态)作用域：函数的作用域在函数"),i,s("的时候就决定了。"),l(a,{color:"red"},{default:o(()=>[s("js采用此方式")]),_:1})]),A]),C,n("p",null,[s("如果是"),u,s("，结果是"),h,s("。原因：执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据"),l(a,{color:"red"},{default:o(()=>[s("书写的")]),_:1}),s("位置，查找上面一层的代码，也就是 value 等于 1")]),n("p",null,[s("如果是"),d,s("，结果是"),g,s("。原因：执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从"),l(a,{color:"red"},{default:o(()=>[s("调用函数的作用域")]),_:1}),s("，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。")]),f])}const S=e(F,[["render",b]]);export{P as __pageData,S as default};
