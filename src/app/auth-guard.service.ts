import { Injectable } from '@angular/core';
import {MemberVo} from './domain/member.vo';
import {Observable, of} from 'rxjs';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad {

  constructor(private router: Router) { }

  login(member: MemberVo): Observable<boolean> {
    // 서버 연동
    if (member.email === 'admin@eastflag.co.kr' && member.password === '123456') {
      // http로 서버에 로그인이 성공하면 토큰 정보를 받아와서 스토리지에 저장한다.
      const token = 'abcdefg';
      localStorage.setItem('token', token);

      if (localStorage.getItem('redirect_url')) {
        this.router.navigateByUrl(localStorage.getItem('redirect_url'));
      } else {
        this.router.navigateByUrl('/');
      }
      return of(true);
    } else {
      return of(false);
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLogIn() {
    // 토큰이 존재하고 body의 exp가 현재의 타임스탬프보다 크면
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const url = `/${route.path}`;
    console.log(url);
    return this.checkLogin(url);
  }

  checkLogin(url: string) {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      localStorage.setItem('redirect_url', url);
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
