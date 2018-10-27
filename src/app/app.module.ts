import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import {FormsModule} from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { JqueryComponent } from './jquery/jquery.component';

const routes: Routes = [
  // HomeComponent가 부모(root)의 router-outlet으로 들어간다.
  {path: '', component: HomeComponent},
  {path: 'todo', component: TodoComponent},
  {path: 'heroes', component: HeroesComponent, children: [
      // HeroDetailComponent가 부모의 router-outlet으로 들어간다.
      {path: ':hero_id', component: HeroDetailComponent} // :은 동적 유알엘
    ]},
  {path: 'jquery', component: JqueryComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    HomeComponent,
    TodoComponent,
    JqueryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // ngModel 디렉티브를 갖고있다.
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
