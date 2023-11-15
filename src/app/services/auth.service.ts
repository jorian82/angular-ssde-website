import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, httpOptions } from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(API_URL + 'auth/signin', {
      username,
      password
    }, httpOptions);
  }
  
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(API_URL + 'auth/signup', {
      username,
      email,
      password
    }, httpOptions);
  }
}
