import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: { player: string; message: string }[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.chatService.getMessages().subscribe(
      (data: any[]) => {
        this.messages = data;
      },
      (error) => {
        console.error('Error loading messages:', error);
      }
    );
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.chatService.sendMessage(this.newMessage).subscribe(
        (response) => {
          console.log('Message sent successfully:', response);
          this.newMessage = ''; // Gönderildikten sonra metin kutusunu temizle
          this.loadMessages(); // Yeni mesaj gönderildikten sonra mesajları yeniden yükle
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
    }
  }
}

