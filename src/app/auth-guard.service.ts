import { Injectable } from '@angular/core';
import {MemberVo} from './domain/member.vo';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }

  login(member: MemberVo): Observable<boolean> {
    // 서버 연동
    if (member.email === 'admin@eastflag.co.kr' && member.password === '123456') {
      // http로 서버에 로그인이 성공하면 토큰 정보를 받아와서 스토리지에 저장한다.
      const token = 'abcdefg';
      localStorage.setItem('token', token);
      return of(true);
    } else {
      return of(false);
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLogIn() {
    // token이 존재하고 body의 exp가 현재의 타임스탬프보다 크면
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
