import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LoginModel } from './login.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedIn: boolean = false;

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient,
    private router: Router
  ) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
  });

  login(loginModel: LoginModel): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/users/token', loginModel, {
      headers: this.headers,
    });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
