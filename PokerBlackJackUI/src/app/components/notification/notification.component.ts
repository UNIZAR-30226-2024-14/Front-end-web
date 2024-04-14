import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}

  message: string = '';
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.notificationService
      .getNotificationSubject()
      .subscribe((message) => {
        this.message = message;
        setTimeout(() => {
          this.close();
        }, 5000); // 5 saniye sonra bildirimi otomatik olarak kapat
      });
  }

  close(): void {
    this.message = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
