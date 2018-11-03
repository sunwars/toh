// shallow copy
/*var obj = { a: 1 };
var copy = obj;
obj.a = 2;
console.log(obj);
console.log(copy);*/

// deep copy
var obj = { a: 1 };
var copy = Object.assign({}, obj);
obj.a = 2;
console.log(obj);
console.log(copy);

// es6 spread
// {}가 새로운 메모리 주소를 만든다.
// ...은 객체의 속성을 펼친다.
var copy2 = {...obj};
copy2.a = 3;

console.log(obj);
console.log(copy);
console.log(copy2);
