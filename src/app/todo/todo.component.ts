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
}
