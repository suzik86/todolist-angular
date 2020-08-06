import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { StorageService } from './storage.service';

const todoListStorageKey = 'Todo_List';

const defaultTodoList = [
  {title: 'Interview', completed: true, dueDate: new Date('2020/08/05')},
  {title: 'develop todo app', completed: true, dueDate: new Date('2020/08/07 ')},
  {title: 'create and push source code to git repository', completed: true, dueDate: new Date('2020/08/07')},
  {title: 'deploy to-do to github pages', completed: true, dueDate: new Date('2020/08/07')},
  {title: 'Create tests for all components', completed: false, dueDate: new Date('2020/08/20')},
];

@Injectable({
  providedIn: 'root'
})

export class TodoListService {
  todoList: TodoItem[];

  constructor(private storageService: StorageService) {
    this.todoList = storageService.getData(todoListStorageKey) || defaultTodoList;
  }

  saveList() {
    this.storageService.setData(todoListStorageKey, this.todoList);
  }

  getTodoList() {
    return this.todoList;
  }

  addItem(item: TodoItem) {
    this.todoList.push(item);
    this.saveList();
  }

  updateItem(item: TodoItem, changes) {
    const index = this.todoList.indexOf(item);
    this.todoList[index] = { ...item, ...changes };
    this.saveList();
  }

  deleteItem(item: TodoItem) {
    const index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    this.saveList();
  }
}
