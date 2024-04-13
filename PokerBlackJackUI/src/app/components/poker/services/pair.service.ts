import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class PairService {
  constructor() { }

  sortCardsByValue(cards: Card[]): Card[] {
    return cards.slice().sort((a, b) => a.value - b.value);
  }

  sortCardsBySuit(cards: Card[]): Card[] {
    return cards.slice().sort((a, b) => {
      if (a.suit < b.suit) return -1;
      if (a.suit > b.suit) return 1;
      return 0;
    });
  }

  countCardValues(cards: Card[]): Map<number, number> {
    const counts = new Map<number, number>();
    cards.forEach(card => {
      counts.set(card.value, (counts.get(card.value) || 0) + 1);
    });
    return counts;
  }

  isOnePair(cards: Card[]): boolean {
    const counts = this.countCardValues(cards);
    for (const count of counts.values()) {
      if (count === 2) {
        return true;
      }
    }
    return false;
  }

  isTwoPairs(cards: Card[]): boolean {
    const counts = this.countCardValues(cards);
    let pairCount = 0;
    for (const count of counts.values()) {
      if (count === 2) {
        pairCount++;
        if (pairCount > 2) {
          return false;
        }
      }
    }
    return pairCount === 2;
  }

  isThreeOfAKind(cards: Card[]): boolean {
    const counts = this.countCardValues(cards);
    let pairCount = 0;
    for (const count of counts.values()) {
      if (count === 3) {
        pairCount++;
        if (pairCount > 3) {
          return false;
        }
      }
    }
    return pairCount === 3;
  }

  isStraight(cards: Card[]): boolean {
    const sortedCards = this.sortCardsByValue(cards);
    let prevValue = sortedCards[sortedCards.length - 1].value;
    for (let i = 0; i < sortedCards.length; i++) {
      const value = sortedCards[i].value;
      if (value === 1 && prevValue === 14) {
        continue;
      }
      if (value !== prevValue + 1) {
        return false;
      }
      prevValue = value;
    }
    return true;
  }

  isFlush(cards: Card[]): boolean {
    const firstSuit = cards[0].suit;
    return cards.every(card => card.suit === firstSuit);
  }

  isFullHouse(cards: Card[]): boolean {
    const counts = this.countCardValues(cards);
    return counts.has(2) && counts.has(3);
  }

  isFourOfAKind(cards: Card[]): boolean {
    const counts = this.countCardValues(cards);
    let pairCount = 0;
    for (const count of counts.values()) {
      if (count === 4) {
        pairCount++;
        if (pairCount > 4) {
          return false;
        }
      }
    }
    return pairCount === 4;
  }

  isStraightFlush(cards: Card[]): boolean {
    return this.isStraight(cards) && this.isFlush(cards);
  }

  isRoyalFlush(cards: Card[]): boolean {
    const sortedCards = this.sortCardsByValue(cards);
    const highestValue = sortedCards[sortedCards.length - 1].value;
    const royalStraight = [highestValue - 4, highestValue - 3, highestValue - 2, highestValue - 1, highestValue];
    return (
      this.isFlush(cards) &&
      royalStraight.every((value, index) => sortedCards[index].value === value)
    );
  }

  evaluateHand(cards: Card[]): string {
    if (this.isRoyalFlush(cards)) {
      return 'Royal Flush';
    }
    if (this.isStraightFlush(cards)) {
      return 'Straight Flush';
    }
    if (this.isFourOfAKind(cards)) {
      return 'Four of a Kind';
    }
    if (this.isFullHouse(cards)) {
      return 'Full House';
    }
    if (this.isFlush(cards)) {
      return 'Flush';
    }
    if (this.isStraight(cards)) {
      return 'Straight';
    }
    if (this.isThreeOfAKind(cards)) {
      return 'Three of a Kind';
    }
    if (this.isTwoPairs(cards)) {
      return 'Two Pairs';
    }
    if (this.isOnePair(cards)) {
      return 'One Pair';
    }
    return 'High Card';
  }
}