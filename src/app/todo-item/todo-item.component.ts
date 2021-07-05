import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ITodo } from '../todo-list/todo-list.types';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo: ITodo;
  @Input() editing: boolean;
  @Output() modifyTodo = new EventEmitter<{
    id: string;
    dto: { checked?: boolean; text?: string };
  }>();
  @Output() removeTodo = new EventEmitter<string>();
  @Output() editTodo = new EventEmitter<string>();
  updatedText = '';

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

  onStartEditing(id: string) {
    this.editTodo.emit(id);
    this.updatedText = this.todo.text;
  }

  onCancelEditing() {
    this.editTodo.emit('');
  }

  onEditingSubmit() {
    this.modifyTodo.emit({
      id: this.todo._id,
      dto: { text: this.updatedText },
    });
    this.editTodo.emit('');
  }
}
