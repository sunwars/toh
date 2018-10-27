import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';
import {HeroService} from '../hero.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  // 리터럴 객체로 객체 생성
  /*hero: Hero = {
    hero_id: 11,
    name: 'Winstorm'
  };*/

  hero: Hero;
  heroes = HEROES;
  isSpecial = true;
  selectedHero: Hero;

  // 생성자로 heroService를 주입받는다.
  constructor(private heroService: HeroService, private router: Router) {
    // new 로 객체 생성
    // this는 객체 인스턴스 자기자신을 가르킨다.
    this.hero = new Hero();
    this.hero.hero_id = 1;
    this.hero.name = 'Winstorm';

    // 의존성이 있는 코드 heroes 클래스가 heroService 클랙스에 의존
    // const heroService = new HeroService();
    // this.heroes = heroService.getHeroes();

    // 서비스 호출
    /*this.heroes = this.heroService.getHeroes();*/

    // ReactivX Observable 스트림 오브 데이터
    this.heroService.getHeroes()
      .subscribe(data => {
        this.heroes = data;
      });

    // 파라메터 수신
    this.heroService.refresh$
      .subscribe(data =>{
        console.log('heroes: ', data);
        // 해당 파라메터로 selected CSS 처리
        this.selectedHero = HEROES.find(item=> item.hero_id === data ? true : false);
      });

    // 부모 목록으로 되돌아 올때 감지가 안되므로 추가
    this.router.events
      .subscribe(events => {
        console.log('router events:' + events);
        // 부모, 자식 경로가 호출될때마다 여러가지 이벤트 발생. NavigationStart -> NavigationReconized -> NavigationEnd
        if (events instanceof NavigationStart) {
          console.log('navigation start:' + events.url);
          if (events.url === '/heroes') {
            this.selectedHero = null;
          }
        }
    });
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
