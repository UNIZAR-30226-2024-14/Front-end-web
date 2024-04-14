import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class PlayingCardModule {
  id: number = 0;
  suit: string = '';
  classicValue: number = 0;
  blackjackValue?: number;
  isAce: boolean = false;
}
