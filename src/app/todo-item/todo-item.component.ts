import { Component, Input, OnInit } from '@angular/core';
import { ITodo } from '../todo-list/todo-list.types';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo: ITodo;
  // TODO @Output onCheck
  // TODO @Output onRemove
}
