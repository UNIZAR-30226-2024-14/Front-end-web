import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SignupModel } from './signup.model';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  signUp(signupData: SignupModel): Observable<any> {
    return this.http
      .post<any>(this.apiUrl + '/users/register', signupData)
      .pipe(
        tap((response) => {
          this.auth.setAccessToken(response.access_token);
          console.log('Access Token:', this.auth.getAccessToken());
        })
      );
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
