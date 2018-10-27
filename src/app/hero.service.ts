import { Injectable } from '@angular/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  /**
   * heroes를 리턴한다.
   * 서비스 변수에 저장하기 때문에 새로고침하면 지워진다.
   * 유지하려면 로컬 스토리지 등을 사용
  */
  /* getHeroes(): Hero[] {
    return HEROES;
  } */
  // ReactivX Observable 비동기
  getHeroes(): Observable<Hero[]> {
    return of(HEROES).pipe(delay(3000));
  }
}
