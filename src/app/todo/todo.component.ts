import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: any;
  todo : any;

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());
    if (this.id != -1) {
      this.todoService.retrieveTodo('Meet', this.id).subscribe(
        data => this.todo = data
      )
    }
  }

  saveTodo() {
    if (this.id == -1) {
      this.todoService.createTodo('Meet', this.todo)
        .subscribe(
        response => {
          this.router.navigate(['todos'])
        }
      )
    } else {
      this.todoService.updateTodo('Meet', this.id, this.todo).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['todos'])
        }
      )
    }
  }

}
