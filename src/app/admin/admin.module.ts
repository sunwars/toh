import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RegisterHeroComponent } from './register-hero/register-hero.component';
import { ManageHeroComponent } from './manage-hero/manage-hero.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminService} from './admin.service';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path: '', component: IndexComponent, children: [
      {path: '', component: DashboardComponent},
      {path: 'register', component: RegisterHeroComponent},
      {path: 'manage', component: ManageHeroComponent}
    ]}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgbModule
  ],
  declarations: [
    IndexComponent,
    RegisterHeroComponent,
    ManageHeroComponent,
    DashboardComponent
  ],
  // 어드민 모듈 생성시 주입
  providers: [AdminService]
})
export class AdminModule { }
