import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ITodo } from './todo-list.types';

const ENDPOINT = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class TodoListService {
  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${ENDPOINT}/todos`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  addTodo(text: string): Observable<ITodo> {
    return this.http
      .post<ITodo>(`${ENDPOINT}/todos`, { text })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  modifyTodo(
    id: string,
    dto: { checked?: boolean; text?: string }
  ): Observable<ITodo> {
    return this.http.patch<ITodo>(`${ENDPOINT}/todos/${id}`, dto).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  removeTodo(id: string) {
    return this.http.delete(`${ENDPOINT}/todos/${id}`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
