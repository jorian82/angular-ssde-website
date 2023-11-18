import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private cookie: CookieService) { }

  signOut(): void {
    // window.sessionStorage.clear();
    this.cookie.remove(TOKEN_KEY);
  }

  public saveToken(token: string): void {
    // window.sessionStorage.removeItem(TOKEN_KEY);
    // window.sessionStorage.setItem(TOKEN_KEY, token);
    this.cookie.remove(TOKEN_KEY);
    this.cookie.set(TOKEN_KEY, token);
  }

  public getToken(): string | null | undefined {
    // return window.sessionStorage.getItem(TOKEN_KEY);
    return this.cookie.get(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.cookie.remove(USER_KEY);
    this.cookie.set(USER_KEY, JSON.stringify(user));
  }
  
  public getUser(): any {
    // const user = window.sessionStorage.getItem(USER_KEY);
    const user = this.cookie.get(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

}
