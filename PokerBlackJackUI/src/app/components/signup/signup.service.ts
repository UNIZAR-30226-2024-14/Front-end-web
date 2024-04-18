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
}
