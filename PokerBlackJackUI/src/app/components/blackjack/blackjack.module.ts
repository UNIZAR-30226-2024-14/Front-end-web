import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlackjackCardComponent } from './blackjack-card/blackjack-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { BetRatesComponent } from './bet-rates/bet-rates.component';
import { CurrentBetsComponent } from './current-bets/current-bets.component';
import { NotificationComponent } from '../notification/notification.component';

@NgModule({
  declarations: [
    BlackjackCardComponent,
    BetRatesComponent,
    CurrentBetsComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  exports: [BlackjackCardComponent, BetRatesComponent, CurrentBetsComponent,NotificationComponent],
})
export class BlackjackModule {}
