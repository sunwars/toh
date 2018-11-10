import { Component, OnInit } from '@angular/core';
import {MemberVo} from '../domain/member.vo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  member = new MemberVo();

  constructor() { }

  ngOnInit() {
  }

  login() {
    console.log('login');
  }

}
