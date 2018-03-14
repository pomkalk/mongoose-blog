import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>('registration', user);
  }
}
