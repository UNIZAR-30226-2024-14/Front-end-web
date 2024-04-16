import { Component, Input, OnInit } from '@angular/core';
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
  usernames: string[] = this.chatService.getUsernames();
  selectedUsername: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.usernames = this.chatService.getUsernames();
    this.selectedUsername = this.usernames[0];
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

      this.chatService
        .sendMessage(this.selectedUsername, time, this.newMessage)
        .subscribe(
          (response) => {
            console.log('Message sent successfully:', response);
            this.newMessage = '';
            this.loadMessages();
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
