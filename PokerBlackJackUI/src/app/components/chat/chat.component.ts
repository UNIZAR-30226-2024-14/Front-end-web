import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Message } from './message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(): void {
    this.chatService.getMessages().subscribe(
      (response) => {
        this.messages = response.map((comment: any) => {
          return {
            username: comment.name,
            time: comment.email,
            msg: comment.body,
          };
        });
        this.scrollToBottom();
      },
      (error) => {
        console.error('Error loading messages:', error);
      }
    );
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      const currentTime = new Date();
      const time = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

      this.chatService.sendMessage('Player', time, this.newMessage).subscribe(
        (response) => {
          console.log('Message sent successfully:', response);
          this.newMessage = ''; // Gönderildikten sonra metin kutusunu temizle
          this.loadMessages(); // Yeni mesajı yüklemek için API'ye istek gönderin
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const chatContainer = document.querySelector('.messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    });
  }
}
