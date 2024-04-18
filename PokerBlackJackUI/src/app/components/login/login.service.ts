import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from './login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl: string = '';
  constructor(private http: HttpClient) {}

  login(loginModel: LoginModel): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', loginModel);
  }
}
