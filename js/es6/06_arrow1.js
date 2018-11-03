let circleArea = (pi, r) =>  pi * r * r;

// 위의 문장을 한줄로 작성하시오.
let circleArea = (pi, r) => pi * r * r;

let result = circleArea(3.14, 3);

console.log(result); //실행 결과 "28.26"

// 익명함수를 애로우 펑션으로 변경가능
// function을 삭제, 입력과 출력사이 화살표 추가
// 출력이 한줄이면 중괄호 생략 가능
// 표현식일 경우 return 도 생략 가능
