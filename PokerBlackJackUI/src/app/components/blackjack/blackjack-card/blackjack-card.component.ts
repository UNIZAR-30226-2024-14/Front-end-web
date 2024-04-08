import { Component, Input } from '@angular/core';
import { Card, Suit } from '../models/card';

@Component({
  selector: 'app-blackjack-card',
  templateUrl: './blackjack-card.component.html',
  styleUrls: ['./blackjack-card.component.scss'],
})
export class BlackjackCardComponent {
  @Input() cards: Card[] = [];

  getCardColor(suit: Suit) {
    return suit === Suit.Spades || suit === Suit.Clubs ? 'black' : 'red';
  }

  getCardSuitSymbol(suit: Suit) {
    switch (suit) {
      case Suit.Spades:
        return '♠';
      case Suit.Hearts:
        return '♥';
      case Suit.Diamonds:
        return '♦';
      case Suit.Clubs:
        return '♣';
      default:
        return '';
    }
  }
}
