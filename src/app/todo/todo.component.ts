import {Component, OnInit, ViewChild} from '@angular/core';
import TodoVo from '../domain/todo.vo';
import {HeroService} from '../hero.service';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {PageVo} from '../domain/page.vo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translate(0, 0)'})),
      transition('void => in', [
        style({opacity: 0, transform: 'translate(-100%, 0)'}),
        animate(300)
      ]),
      /*transition('in => void', [
        animate(300,style({opacity: 0, transform: 'translate(100%, 0)'}))
      ])*/
      transition('in => void', [
        // animate(300, style({opacity: '0', transform: 'translate(100%, 0)'}))
        // multi frame transition
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-50px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class TodoComponent implements OnInit {
  todoList: TodoVo[];
  newTodo = new TodoVo(); // 신규 TodoVo 객체 매핑용
  
  // 취소시 복원하기 위한 자료구조 Map객체
  // key, 객체 명시적 type 지정
  tempMap = new Map<number, TodoVo>();

  // 페이지 정보
  page = new PageVo(1, 5, 0);

  constructor(private heroService: HeroService) {
    // this.page.pageIndex = 1;
    // this.page.pageSize = 5;
    // this.page.totalCount = 0; //서버에서 받기전까지 알수 없다.
  }

  ngOnInit() {
    this.getTodoList();
  }
  getTodoList(){
    /*this.heroService.getTodoList()
      .subscribe(body => {
        this.todoList = body;
        console.log(this.todoList);
      });*/
    const startIndex = (this.page.pageIndex - 1) * this.page.pageSize;
    const pageSize = this.page.pageSize;

    this.heroService.getPagedTodoList(startIndex, pageSize)
      .subscribe(body => {
        this.todoList = body.data;
        // totoal count
        this.page.totalCount = body.total;
      });
  }

  addTodo() {
    this.heroService.addTodo(this.newTodo)
      .subscribe(body => {
        // 해당객체를 todoList의 맨 앞에 삽입
        this.todoList.unshift(body);

        // 입력값을 지우기
        this.newTodo = new TodoVo();
      });
  }

  save(todo: TodoVo) {
    todo.isEdited = true;
    // this.tempMap.set(todo.todo_id, todo);
    // deep copy
    this.tempMap.set(todo.todo_id, Object.assign({}, todo));
  }
  restore(todo: TodoVo) {
    // 기존값울 복원
    // todo = this.tempMap.get(todo.todo_id);
    Object.assign(todo, this.tempMap.get(todo.todo_id));

    todo.isEdited = false;
  }
  modify(todo: TodoVo) {
    this.heroService.modifyTodo(todo)
      .subscribe(body => {
        // 성공하면 서버에서 넘어온 값으로 기존값을 overwrite해야 updated가 반영
        Object.assign(todo, body);

        todo.isEdited = false;
        // todoVo 객체 전체를 마라메터로 넘겼다.
        // 실제로는 API 규격에 맞게 넘겨야 된다.
      });
  }

  remove(todo: TodoVo) {
    let result = confirm('삭제하시겠습니다?');
    if(result) {
      this.heroService.removeTodo(todo.todo_id)
        .subscribe(body => {

          if(body.result === 0) {
            // todoList에서 해당 todo_id를 삭제
            // index를 찾은 후에 splice로 삭제
            const index =  this.todoList.findIndex(item => item.todo_id === todo.todo_id ? true : false);
            this.todoList.splice(index, 1);
          }
        });
    }
  }
  pageChange(event: any){
    // pageIndex가 이베트로 넘어온다.
    console.log(event);

    this.page.pageIndex = event;
    this.getTodoList();
  }
}
