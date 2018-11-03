var hero = {
  name: 'aaa',
  id: 1,
};

// in 연산자는 객체의 key를 가져온다.
for(var h in hero) {
  console.log(h, hero[h]); // 객체의 key
}


var fruits = ['apple', 'banana', 'grape'];

for(var item in fruits) {
  console.log(item, fruits[item]); // ???
}

for(var item of fruits) {
  console.log(item); // ???
}
