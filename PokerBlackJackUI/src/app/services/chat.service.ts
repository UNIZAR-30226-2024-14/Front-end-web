import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + '/comments');
  }

  sendMessage(
    username: string,
    time: string,
    message: string
  ): Observable<any> {
    // Burada mesaj gönderme işlemi için bir API yok, bu yüzden sadece bir Observable döndürüyoruz
    // Gerçek bir uygulamada, mesajı göndermek için bir POST isteği göndermelisiniz.
    return new Observable((observer) => {
      observer.next({ username, time, message });
      observer.complete();
    });
  }
}
