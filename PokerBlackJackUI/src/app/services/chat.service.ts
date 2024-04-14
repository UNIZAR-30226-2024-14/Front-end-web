import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'http://example.com/api'; // Backend API URL'si

  constructor(private http: HttpClient) {}

  private messages: { player: string; message: string }[] = [];


  getMessages(): Observable<{ player: string; message: string }[]> {
    return of(this.messages);
  }

  sendMessage(player: string, message: string): void {
    this.messages.push({ player, message });
  }
}
