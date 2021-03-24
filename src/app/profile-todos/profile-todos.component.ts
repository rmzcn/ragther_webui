import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoList } from '../todo.datasource'

@Component({
  selector: 'profile-todos',
  templateUrl: './profile-todos.component.html',
  styleUrls: ['./profile-todos.component.css','./card.css']
})
export class ProfileTodosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getTodos() : Todo[]{
    return TodoList;
  }

}
