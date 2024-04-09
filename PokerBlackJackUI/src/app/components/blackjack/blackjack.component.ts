import { Component, OnInit } from '@angular/core';
import { DeckService } from './services/deck.service';
import { Card } from './models/card';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss'],
})
export class BlackjackComponent implements OnInit {
  players: Card[][] = [];
  dealer: Card[] = [];

  // Örnek olarak, sabit bir bahis oranı ve başlangıçtaki bahis miktarı
  betRate = 10;
  initialBetAmount = 100;

  betRates: number[] = [5, 10, 20, 50]; // Bahis oranlarını tutacak dizi
  currentBets: number[] = [this.initialBetAmount]; // Kullanıcıların mevcut bahislerini tutacak dizi

  constructor(private deckService: DeckService) {
    // Deal cards to players and dealer
    const numberOfPlayers = 3;
    const cardsPerPlayer = 2;
    const cardsPerDealer = 2;

    this.players = this.deckService.dealCardsToPlayers(
      numberOfPlayers,
      cardsPerPlayer
    );
    this.dealer = this.deckService.dealCardsToDealer(cardsPerDealer);
  }
  ngOnInit(): void {
    this.startGame();
  }

  updateBetAmount(amount: number): void {
    this.currentBets.push(amount);
  }

  startGame(): void {
    // Dağıtıcıya iki kart dağıt
    this.dealer = this.deckService.dealCardsToDealer(2);

    // Eksik olan oyunculara iki kart dağıt
    const numberOfPlayers = this.players.length;
    for (let i = 0; i < numberOfPlayers; i++) {
      if (this.players[i].length === 0) {
        this.players[i] = this.deckService.dealCardsToPlayers(1, 2)[0];
      }
    }

    // Oyuncuların ve dağıtıcının kart toplamlarını kontrol et ve kazananı belirle
    this.checkPlayersAndDealerTotal();
  }

  checkPlayersAndDealerTotal(): void {
    const numberOfPlayers = this.players.length;

    for (let i = 0; i < numberOfPlayers; i++) {
      const playerTotal = this.calculateTotal(this.players[i]);
      if (playerTotal === 21) {
        this.handlePlayerBlackjack(i);
      } else if (playerTotal > 21) {
        this.handlePlayerBust(i);
      }
    }

    const dealerTotal = this.calculateTotal(this.dealer);
    if (dealerTotal === 21) {
      this.handleDealerBlackjack();
    } else if (dealerTotal > 21) {
      this.handleDealerBust();
    }
  }

  calculateTotal(cards: Card[]): number {
    let total = 0;
    let aceCount = 0;

    // Kartların değerlerini hesapla
    for (const card of cards) {
      if (card.value === 'A') {
        aceCount++;
        total += 11; // As başlangıçta 11 sayılacak, sonradan 1 sayılabilir
      } else if (['J', 'Q', 'K'].includes(card.value)) {
        total += 10;
      } else {
        total += parseInt(card.value);
      }
    }

    // As'lar için toplamı düzelt
    while (total > 21 && aceCount > 0) {
      total -= 10;
      aceCount--;
    }

    return total;
  }

  handlePlayerBlackjack(playerIndex: number): void {
    console.log(`Player ${playerIndex + 1} has blackjack!`);
    // Burada kazanma işlemleri gerçekleştirilebilir
  }

  handlePlayerBust(playerIndex: number): void {
    console.log(`Player ${playerIndex + 1} busted!`);
    // Burada kaybetme işlemleri gerçekleştirilebilir
  }

  handleDealerBlackjack(): void {
    console.log(`Dealer has blackjack!`);
    // Burada kazanma işlemleri gerçekleştirilebilir
  }

  handleDealerBust(): void {
    console.log(`Dealer busted!`);
    // Burada kaybetme işlemleri gerçekleştirilebilir
  }
}
