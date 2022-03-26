import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

export class Todo{
  constructor(
    public id: number,
    public description: String,
    public isDone: boolean,
    public targetDate: Date
  ) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {


  todos : any;
  // todos = [
  //   new Todo(1, 'Learn Java Springboot', false, new Date()),
  //   new Todo(2, 'Become Expert at Java Springboot', false, new Date()),
  //   new Todo(3, 'Become full stack developer', false, new Date())
  //   // { id: 1, description: 'Learn Java Springboot' },
  //   // { id: 2, description: 'Become Expert at Java Springboot' },
  //   // { id: 3, description: 'Become full stack developer' }
  // ]

  message: any;

  constructor(
    private todoService: TodoDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos('Meet').subscribe(
      response => {
        this.todos = response;
      }
    )
  }

  deleteTodo(id : any) {
    // console.log(`Deleted of ${id}`)
    this.todoService.deleteTodo('Meet', id).subscribe(
      response => {
        console.log(response)
        this.message = 'Delete sucessful for id '+ id;
        this.refreshTodos();
      }
    );

  }

  updateTodo(id: any) {
    console.log(`Update ${id}`)
    this.router.navigate(['todos', id]);
  }

  createTodo() {
    // this.todoService.createTodo()
    console.log("Inside create todo!!")
    this.router.navigate(['todos', -1])
  }

}
