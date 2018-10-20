import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  // 리터럴 객체로 객체 생성
  /*hero: Hero = {
    id: 11,
    name: 'Winstorm'
  };*/

  hero: Hero;
  heroes = HEROES;
  isSpecial = true;
  selectedHero: Hero;

  constructor() {
    // new 로 객체 생성
    // this는 객체 인스턴스 자기자신을 가르킨다.
    this.hero = new Hero();
    this.hero.id = 1;
    this.hero.name = 'Winstorm';
  }

  ngOnInit() {
  }

  onSave(evnet) {
    console.log(evnet);
    alert('hi');
  }

  onSelected(hero: Hero){
    this.selectedHero = hero;
  }

}
