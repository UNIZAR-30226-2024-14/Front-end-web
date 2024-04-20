import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PokerPlayerService } from "../services/poker-player.service";
import { PokerPlayerModule } from "../models/poker-player/poker-player.module";
import { PokerService } from "../services/poker.service";
import { PokerCardComponent } from "../poker-card/poker-card.component";
import { CommonModule } from "@angular/common";
import { Card } from "../models/card.model";
import { PokerComponent } from "../poker.component";

@Component({
  selector: "app-poker-player",
  standalone: true,
  templateUrl: "./poker-player.component.html",
  styleUrl: "./poker-player.component.scss",
  imports: [PokerCardComponent, CommonModule],
})
export class PokerPlayerComponent implements OnInit {
  constructor(
    private playerService: PokerPlayerService,
  ) {}
  // @Output() addCardEvent = new EventEmitter<void>();

  playerHand_: any[] = [];
  player: PokerPlayerModule = {
    balance: 0,
    playerName: "You",
    cards: [],
    betAmount: 0,
    currentBet: 0,
    isFold: false,
    isCall: false,
    isCheck: false,
    isRaise: false,
  };

  iscall = false;
  ngOnInit(): void {
    this.playerHand_ = this.playerService.getRandomPlayerHand();
  }

  showRaiseSlider() {
    this.player.isRaise = true;
  }

  updateBetAmount(amount: number) {
    this.player.betAmount = amount;
  }

  cancelBet() {
    this.player.isRaise = false;
  }

  confirmBet() {
    // Burada betAmount değeri kullanıcı tarafından seçilen bahis miktarıdır.
    // Bu değeri kullanarak gereken işlemleri gerçekleştirebilirsiniz.
    console.log("Confirmed bet amount:", this.player.betAmount);
    // İşlemler tamamlandıktan sonra raise bölümünü gizleyin
    this.player.isRaise = false;
  }

  // callButton() {
  //   console.log("Call button clicked");
  //   this.iscall= true;
  //   // this.addCardEvent.emit();
  //   return true;
  // }

  

}
