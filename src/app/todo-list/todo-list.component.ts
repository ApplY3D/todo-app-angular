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
  newTodoText = '';
  disableInput = false;

  constructor(
    private todolistService: TodoListService,
    private alertService: AlertService
  ) {}

  private fetchAll() {
    this.error = '';
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

  ngOnInit(): void {
    this.fetchAll();
  }

  addTodo() {
    if (!this.newTodoText) {
      return;
    }
    this.disableInput = true;
    this.todolistService.addTodo(this.newTodoText).subscribe(
      (todo) => {
        this.disableInput = false;
        this.newTodoText = '';
        this.todos.push(todo);
        this.alertService.success('success');
      },
      (error) => {
        this.disableInput = false;
        this.alertService.danger(error.message);
      }
    );
  }

  removeTodo(id: string) {
    this.todolistService.removeTodo(id).subscribe(
      (todo) => {
        this.todos = this.todos.filter((t) => t._id !== id);
        this.alertService.warning('success');
      },
      (error) => {
        this.alertService.danger(error.message);
      }
    );
  }

  modifyTodo({
    id,
    dto,
  }: {
    id: string;
    dto: { checked?: boolean; text?: string };
  }) {
    this.todolistService.modifyTodo(id, dto).subscribe(
      (todo) => {
        this.todos = this.todos.map((t) => (t._id === id ? todo : t));
      },
      (error) => {
        this.alertService.danger(error.message);
      }
    );
  }

  updateList() {
    this.fetchAll();
  }
}
