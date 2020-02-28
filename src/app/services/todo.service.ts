import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Todo } from "../models/Todo";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class TodoService {
  todosUrl: string = "https://jsonplaceholder.typicode.com/todos";
  todosLimit: string = "?_limit=5";
  constructor(private http: HttpClient) {}
  // Get Todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }
  // Update Todo
  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }
  // Delete Todo
  deleteTodo(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete(url, httpOptions);
  }

  // Add todo
  addTodo(todo: Todo): Observable<any> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
