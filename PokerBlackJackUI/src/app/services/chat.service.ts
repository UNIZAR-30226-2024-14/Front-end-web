import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://example.com/api'; // Backend API URL'si

  constructor(private http: HttpClient) {}

  // Örnek bir GET isteği
  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages`);
  }

  // Örnek bir POST isteği
  sendMessage(message: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/messages`, { message });
  }
}
