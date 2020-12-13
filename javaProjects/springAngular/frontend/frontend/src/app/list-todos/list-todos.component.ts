import { TodoDataService } from './../services/data/todo-data.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css'],
})
export class ListTodosComponent implements OnInit {
  // todos = [
  //   new Todo(1, 'Learn to Dance', false, new Date()),
  //   new Todo(2, 'Expert at Angular', false, new Date()),
  // ];

  todos: Todo[];

  message: string;

  displayedColumns: string[] = [
    // 'id',
    'description',
    'targetDate',
    'completed',
    'edit',
    'delete',
  ];

  constructor(
    private todoService: TodoDataService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos('sai').subscribe((res) => {
      this.todos = res;
    });
  }

  deleteTodo(id) {
    this.todoService.deleteTodo('sai', id).subscribe((res) => {
      this._snackBar.open(`todo ${id} was successfully deleted`, '', {
        duration: 2000,
        verticalPosition: 'top',
      });
      this.refreshTodos();
    });
  }

  updateTodo(id) {
    this.router.navigate(['todos', id]);
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }
}
