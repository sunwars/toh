import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  // @Input()
  selectedHero: Hero;

  constructor(private route: ActivatedRoute, private heroService: HeroService) {
    this.route.params
      .subscribe(params => {
        console.log(params); // { "hero_id": "11"}
        // 11에 해당하는 모델값을 서비스에서 가져온다.
        // this.selectedHero = this.heroService.getHero(+params.hero_id);
        this.getHero(+params.hero_id);
        // 파라메터 받은것을 publish 한다. 1:n 구조
        this.heroService.refresh.next(+params.hero_id);
      });
  }

  ngOnInit() {
  }

  getHero(hero_id: number) {
    this.heroService.getHero(hero_id)
      .subscribe(body => this.selectedHero = body);
  }

}
