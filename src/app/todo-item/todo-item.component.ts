import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ITodo } from '../todo-list/todo-list.types';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo: ITodo;
  @Output() modifyTodo = new EventEmitter<{
    id: string;
    dto: { checked?: boolean; text?: string };
  }>();
  @Output() removeTodo = new EventEmitter<string>();

  onCheck($event: Event) {
    $event.preventDefault();
    this.modifyTodo.emit({
      id: this.todo._id,
      dto: { checked: !this.todo.checked },
    });
  }

  onRemove() {
    console.log('remove');
    this.removeTodo.emit(this.todo._id);
  }
}
