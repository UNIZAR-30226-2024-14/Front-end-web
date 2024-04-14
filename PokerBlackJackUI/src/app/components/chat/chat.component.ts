import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: { player: string; message: string }[] = [];
  newMessage: string = '';

  @ViewChild('messagesContainer', { static: true }) private messagesContainer!: ElementRef;


  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(): void {
    this.chatService
      .getMessages()
      .subscribe((messages) => {
        this.messages = messages;
        this.scrollToBottom();
      });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.chatService.sendMessage('Player', this.newMessage);
      this.newMessage = ''; // Gönderildikten sonra metin kutusunu temizle
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
