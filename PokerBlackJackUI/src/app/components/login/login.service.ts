import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from './login.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl: string = '';
  loggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(loginModel: LoginModel): Observable<any> {
    this.loggedIn = true; // to do change it when api comes.
    if (this.isLoggedIn()) {
      this.router.navigate(['/lobby']);
    } else {
      console.log('Invalid credentials');
      this.router.navigate(['/login']);
    }
    return this.http.post<any>(this.apiUrl + '/login', loginModel);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
