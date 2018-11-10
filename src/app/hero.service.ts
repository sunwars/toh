import { Injectable } from '@angular/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';
import {Observable, of, Subject} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import TodoVo from './domain/todo.vo';
import ResultVo from './domain/result.vo';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  refresh = new Subject<number>(); // publisher: next() 함수로 데이터 발생
  refresh$ = this.refresh.asObservable(); // subscriber: subscribe()로 데이터 수신

  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type','application/json');
  }

  /**
   * heroes를 리턴한다.
   * 서비스 변수에 저장하기 때문에 새로고침하면 지워진다.
   * 유지하려면 로컬 스토리지 등을 사용
   */
  getHeroes(): Observable<Hero[]> {
    // return of(HEROES).pipe(delay(500));
    // es6 템플릿 스트링 문법 : `${변수}`
    return this.http.get<Hero[]>(`${environment.HOST}/api/heroes`);
  }

  getHero(hero_id: number): Observable<Hero> {
    return this.http.get<Hero>(environment.HOST + `/api/hero/${hero_id}`);
  }

  getTodoList(): Observable<TodoVo[]> {
    // return this.http.get<TodoVo[]>(`${environment.HOST}/api/todo`);
    return this.http.get<TodoVo[]>(`${environment.HOST}/api/todo`);
  }

  addTodo(todo: TodoVo): Observable<TodoVo> {
    return this.http.post<TodoVo>(`${environment.HOST}/api/todo`, todo,{headers: this.headers});
  }

  modifyTodo(todo: TodoVo): Observable<TodoVo> {
    return this.http.put<TodoVo>(`${environment.HOST}/api/todo`, todo,{headers: this.headers});
  }

  removeTodo(todo_id: number): Observable<ResultVo> {
    return this.http.delete<ResultVo>(`${environment.HOST}/api/todo?todo_id=${todo_id}`);
  }
}
