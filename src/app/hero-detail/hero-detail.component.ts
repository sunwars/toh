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
        console.log(params); // { "id": "11"}
        // 11에 해당하는 모델값을 서비스에서 가져온다.
        this.selectedHero = this.heroService.getHero(+params.id);
      });
  }

  ngOnInit() {
  }

}
