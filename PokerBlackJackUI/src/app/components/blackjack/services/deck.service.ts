import { Injectable } from '@angular/core';
import { Card, Suit, Value } from '../models/card';
import { Deck } from '../models/deck';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private deck: Deck = {
    cards: [],
  };

  constructor() {
    this.createDeck();
    this.shuffleDeck();
  }

  createDeck(): void {
    for (const suit of Object.values(Suit)) {
      for (const value of Object.values(Value)) {
        this.deck.cards.push({
          suit: suit,
          value: value as Value,
        });
      }
    }
  }

  shuffleDeck(): void {
    for (let i = this.deck.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck.cards[i], this.deck.cards[j]] = [
        this.deck.cards[j],
        this.deck.cards[i],
      ];
    }
  }

  dealCard(): Card | null {
    if (this.deck.cards.length === 0) {
      return null;
    }
    return this.deck.cards.pop()!;
  }

  dealCardsToPlayers(
    numberOfPlayers: number,
    cardsPerPlayer: number
  ): Card[][] {
    const playersCards: Card[][] = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      const playerCards: Card[] = [];
      for (let j = 0; j < cardsPerPlayer; j++) {
        const card = this.dealCard();
        if (card) {
          playerCards.push(card);
        }
      }
      playersCards.push(playerCards);
    }
    return playersCards;
  }

  dealCardsToDealer(cardsPerDealer: number): Card[] {
    const dealerCards: Card[] = [];
    for (let i = 0; i < cardsPerDealer; i++) {
      const card = this.dealCard();
      if (card) {
        dealerCards.push(card);
      }
    }
    return dealerCards;
  }

  getDeck(): Deck {
    return this.deck;
  }

  dealInitialCards(numberOfPlayers: number): [Card[][], Card[]] {
    const playersCards: Card[][] = this.dealCardsToPlayers(numberOfPlayers, 2);
    const dealerCards: Card[] = this.dealCardsToDealer(2);
    return [playersCards, dealerCards];
  }
}
