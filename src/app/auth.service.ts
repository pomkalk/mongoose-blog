import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  private userStatus = new Subject<any>();
  userStatusUpdated = this.userStatus.asObservable();

  constructor(private http: HttpClient) { }

  isAuth(): boolean {
    return localStorage.getItem('user_token') ? true : false;
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>('registration', user);
  }

  logout() {
    localStorage.removeItem('user_token');
    this.userStatus.next();
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>('login', credentials).map((response) => {
      if (response.token) {
        localStorage.setItem('user_token', response.token);
        this.userStatus.next();
      }
      return response;
    });
  }
}
