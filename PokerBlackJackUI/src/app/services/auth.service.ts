import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private _accessToken: string | null = null;

  getAccessToken(): string | null {
    return this._accessToken;
  }

  setAccessToken(token: string): void {
    this._accessToken = token;
    localStorage.setItem('accessToken', token);
  }

  clearAccessToken(): void {
    this._accessToken = null;
    localStorage.removeItem('accessToken');
  }
}
