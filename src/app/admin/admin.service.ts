import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Hero} from '../hero';
import {Observable} from 'rxjs';
import ResultVo from '../domain/result.vo';
import {environment} from '../../environments/environment';

// root 모듈 생성시 이 서비스는 주입 될 수 없다.
// admin 모듈이 lazy loading 되기 때문에
@Injectable(/*{
   providedIn: 'root'
}*/ )
export class AdminService {
  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
  }

  addHero(hero: Hero): Observable<ResultVo> {
    return this.http.post<ResultVo>(`${environment.HOST}/api/hero`, hero, {headers: this.headers});
  }

  imageUpload(formData: FormData): Observable<ResultVo> {
    // content type을 지정하지 말아야 한다
    // formDat가 body에 들어가면 브라우저가 form 발싱 전송을 대신 수행해준다.
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data'); //브라우저가 자동 생성함.
    // headers.append('Accept', 'application/json');

    //return this.http.post<ResultVo>(`${environment.HOST}/api/file`, formData, {headers: headers});
    return this.http.post<ResultVo>(`${environment.HOST}/api/file`, formData);

  }
}
