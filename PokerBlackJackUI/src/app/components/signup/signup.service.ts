import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupModel } from './signup.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private apiUrl: string = '';

  constructor(private http: HttpClient) {}

  signUp(signupData: SignupModel): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/signup', signupData);
  }

  isEmailValid(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  isPasswordValid(password: string): boolean {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    return passwordPattern.test(password);
  }
}
