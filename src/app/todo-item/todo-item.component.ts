import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() item: TodoItem;
  @Output() remove: EventEmitter<TodoItem> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();
  today: number;

  constructor() {
    this.today = Math.round(new Date().getTime() / 24 / 3600 / 1000);
  }

  ngOnInit(): void {
  }

  expirationStatus(item: TodoItem) {
    const diff: number = Math.round(new Date(item.dueDate).getTime() / 24 / 3600 / 1000) - this.today;
    if (diff > 1) {
      return 'not-expired';
    }
    if (diff < 1 && diff >= 0) {
      return 'expired-soon';
    }

    return 'expired';
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  completeItem() {
    this.update.emit({
      item: this.item,
      changes: {completed: !this.item.completed}
    });
  }

}
