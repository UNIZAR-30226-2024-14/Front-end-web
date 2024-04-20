import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PokerPlayerModule {
  balance : number = 0;
  playerName : string = 'You';
  cards : any[] = [];
  betAmount : number = 0;
  currentBet : number = 0;
  isFold : boolean = false;
  isCall : boolean = false;
  isCheck : boolean = false;
  isRaise : boolean = false;
}
