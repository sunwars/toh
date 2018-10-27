import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-jquery',
  templateUrl: './jquery.component.html',
  styleUrls: ['./jquery.component.scss']
})
export class JqueryComponent implements OnInit {
  todoList;

  constructor() { }

  ngOnInit() {
    this.getTodoList();
  }

  getTodoList() {
    $.ajax({
      url: 'http://www.javabrain.kr:8080/api/todo',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        console.log(data);
        this.todoList = data;
        this.refresh();
      }
    });
  }

  refresh() {
    console.log('refresh');
    $('#todo_list').empty();

    this.todoList.forEach(function(item, index) {
      const todo =
        '<tr>' +
        '<td>' +
        (item.isFinished ? '완료' : '미완료') +
        '</td>' +
        (item.isFinished ? '<td style="text-decoration: line-through">' : '<td>') + item.todo + '</td>' +
        '<td>' + item.created + '</td>' +
        '<td>' + item.updated + '</td>' +
        '<td>' +
        '<button type="button">삭제</button>' +
        '</td>' +
        '</tr>';
      $('#todo_list').append(todo);
    });
  }
}

