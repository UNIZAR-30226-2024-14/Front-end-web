import { Component } from '@angular/core';
import { DeckService } from './services/deck.service';
import { Card } from './models/card';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss'],
})
export class BlackjackComponent {
  players: Card[][] = [];
  dealer: Card[] = [];

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
}
