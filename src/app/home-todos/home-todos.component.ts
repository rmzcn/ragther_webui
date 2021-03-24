import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoList } from '../todo.datasource';

@Component({
  selector: 'home-todos',
  templateUrl: './home-todos.component.html',
  styleUrls: ['./home-todos.component.css']
})
export class HomeTodosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getTodos() : Todo[]{
    return TodoList;
  }

}
