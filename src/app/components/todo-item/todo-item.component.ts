import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Todo } from "../../models/Todo";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"]
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  // Set dynamic classes
  setClasses() {
    const classes = {
      todo: true,
      "is-completed": this.todo.completed
    };
    return classes;
  }
  onToggle(todo: Todo) {
    // Toggle in UI
    todo.completed = !todo.completed;
    // Toggle on server
    this.todoService
      .toggleCompleted(todo)
      .subscribe((updatedTodo: any) => console.log("updatedTodo", updatedTodo));
  }
  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }
}
