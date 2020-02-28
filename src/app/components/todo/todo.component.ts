import { Component, OnInit } from "@angular/core";
import { Todo } from "../../models/Todo";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => (this.todos = todos));
  }
  deleteTodo(todo: Todo) {
    // Remove from UI
    this.todos = this.todos.filter(item => item.id !== todo.id);
    // Remove from server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(newTodo => {
      this.todos.push(newTodo);
    });
  }
}
