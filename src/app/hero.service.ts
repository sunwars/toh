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
   */
  getHeroes(): Observable<Hero[]> {
    return of(HEROES).pipe(delay(500));
  }

  getHero(id: number) {
    return HEROES.find(item => item.id === id ? true : false);
  }
}
