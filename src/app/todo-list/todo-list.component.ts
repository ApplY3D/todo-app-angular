import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { TodoListService } from './todo-list.service';

import { ITodo } from './todo-list.types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todos: ITodo[] = [];
  error: string;
  loading = false;

  constructor(
    private todolistService: TodoListService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.todolistService.fetchTodos().subscribe(
      (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.error = error.message;
        this.loading = false;
        this.alertService.danger(error.message);
      },
      () => {
        this.loading = false;
      }
    );
  }
}
