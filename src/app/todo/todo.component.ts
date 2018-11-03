import {Component, OnInit, ViewChild} from '@angular/core';
import TodoVo from '../domain/todo.vo';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoList: TodoVo[];
  newTodo = new TodoVo(); // 신규 TodoVo 객체 매핑용
  
  // 취소시 복원하기 위한 자료구조 Map객체
  // key, 객체 명시적 type 지정
  tempMap = new Map<number, TodoVo>();

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroService.getTodoList()
      .subscribe(body => {
        this.todoList = body;
        console.log(this.todoList);
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
        // 성공하면
        todo.isEdited = false;
        // todoVo 객체 전체를 마라메터로 넘겼다.
        // 실제로는 API 규격에 맞게 넘겨야 된다.
      });
  }
}
