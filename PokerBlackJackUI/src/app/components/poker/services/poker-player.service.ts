import { Injectable, Input } from '@angular/core';
import { Card } from '../models/card.model';
import { PokerPlayerModule } from '../models/poker-player/poker-player.module';
import { PlayerModule } from 'src/app/models/player/player.module';


@Injectable({
  providedIn: 'root'
})
export class PokerPlayerService {

  constructor() { }
  

  pokerCards: Card[] = [
    { image: '../../../../assets/img/poker-cards/2_of_clubs.png', value: 2, suit: 'Clubs' },
    { image: '../../../../assets/img/poker-cards/3_of_clubs.png', value: 3, suit: 'Clubs' },
    { image: '../../../../assets/img/poker-cards/4_of_clubs.png', value: 4, suit: 'Clubs' },
    { image: '../../../../assets/img/poker-cards/5_of_clubs.png', value: 5, suit: 'Clubs' },
    { image: '../../../../assets/img/poker-cards/6_of_clubs.png', value: 6, suit: 'Clubs' },
    { image: '../../../../assets/img/poker-cards/7_of_clubs.png', value: 7, suit: 'Clubs' },
    { image: '../../../../assets/img/poker-cards/8_of_clubs.png', value: 8, suit: 'Clubs' },
    { image: '../../../../assets/img/poker-cards/9_of_clubs.png', value: 9, suit: 'Clubs' },
    { image: '../../../../assets/img/poker-cards/10_of_clubs.png', value: 10, suit: 'Clubs' },
    { image: '../../../../assets/img/poker-cards/jack_of_clubs.png', value: 10, suit: 'Clubs' },
    { image: '../../../../assets/img/poker-cards/queen_of_clubs.png', value: 10, suit: 'Clubs' },
    { image: '../../../../assets/img/poker-cards/king_of_clubs.png', value: 10, suit: 'Clubs' },
    { image: '../../../../assets/img/poker-cards/ace_of_clubs.png', value: 11, suit: 'Clubs' },
    { image: '../../../../assets/img/poker-cards/2_of_diamonds.png', value: 2, suit: 'Diamonds' },
    { image: '../../../../assets/img/poker-cards/3_of_diamonds.png', value: 3, suit: 'Diamonds' },
    { image: '../../../../assets/img/poker-cards/4_of_diamonds.png', value: 4, suit: 'Diamonds' },
    { image: '../../../../assets/img/poker-cards/5_of_diamonds.png', value: 5, suit: 'Diamonds' },
    { image: '../../../../assets/img/poker-cards/6_of_diamonds.png', value: 6, suit: 'Diamonds' },
    { image: '../../../../assets/img/poker-cards/7_of_diamonds.png', value: 7, suit: 'Diamonds' },
    { image: '../../../../assets/img/poker-cards/8_of_diamonds.png', value: 8, suit: 'Diamonds' },
    { image: '../../../../assets/img/poker-cards/9_of_diamonds.png', value: 9, suit: 'Diamonds' },
    { image: '../../../../assets/img/poker-cards/10_of_diamonds.png', value: 10, suit: 'Diamonds' },
    { image: '../../../../assets/img/poker-cards/jack_of_diamonds.png', value: 10, suit: 'Diamonds' },
    { image: '../../../../assets/img/poker-cards/queen_of_diamonds.png', value: 10, suit: 'Diamonds' },
    { image: '../../../../assets/img/poker-cards/king_of_diamonds.png', value: 10, suit: 'Diamonds' },
    { image: '../../../../assets/img/poker-cards/ace_of_diamonds.png', value: 11, suit: 'Diamonds' },
    { image: '../../../../assets/img/poker-cards/2_of_hearts.png', value: 2, suit: 'Hearts' },
    { image: '../../../../assets/img/poker-cards/3_of_hearts.png', value: 3, suit: 'Hearts' },
    { image: '../../../../assets/img/poker-cards/4_of_hearts.png', value: 4, suit: 'Hearts' },
    { image: '../../../../assets/img/poker-cards/5_of_hearts.png', value: 5, suit: 'Hearts' },
    { image: '../../../../assets/img/poker-cards/6_of_hearts.png', value: 6, suit: 'Hearts' },
    { image: '../../../../assets/img/poker-cards/7_of_hearts.png', value: 7, suit: 'Hearts' },
    { image: '../../../../assets/img/poker-cards/8_of_hearts.png', value: 8, suit: 'Hearts' },
    { image: '../../../../assets/img/poker-cards/9_of_hearts.png', value: 9, suit: 'Hearts' },
    { image: '../../../../assets/img/poker-cards/10_of_hearts.png', value: 10, suit: 'Hearts' },
    { image: '../../../../assets/img/poker-cards/jack_of_hearts.png', value: 10, suit: 'Hearts' },
    { image: '../../../../assets/img/poker-cards/queen_of_hearts.png', value: 10, suit: 'Hearts' },
    { image: '../../../../assets/img/poker-cards/king_of_hearts.png', value: 10, suit: 'Hearts' },
    { image: '../../../../assets/img/poker-cards/ace_of_hearts.png', value: 11, suit: 'Hearts' },
    { image: '../../../../assets/img/poker-cards/2_of_spades.png', value: 2, suit: 'Spades' },
    { image: '../../../../assets/img/poker-cards/3_of_spades.png', value: 3, suit: 'Spades' },
    { image: '../../../../assets/img/poker-cards/4_of_spades.png', value: 4, suit: 'Spades' },
    { image: '../../../../assets/img/poker-cards/5_of_spades.png', value: 5, suit: 'Spades' },
    { image: '../../../../assets/img/poker-cards/6_of_spades.png', value: 6, suit: 'Spades' },
    { image: '../../../../assets/img/poker-cards/7_of_spades.png', value: 7, suit: 'Spades' },
    { image: '../../../../assets/img/poker-cards/8_of_spades.png', value: 8, suit: 'Spades' },
    { image: '../../../../assets/img/poker-cards/9_of_spades.png', value: 9, suit: 'Spades' },
    { image: '../../../../assets/img/poker-cards/10_of_spades.png', value: 10, suit: 'Spades' },
    { image: '../../../../assets/img/poker-cards/jack_of_spades.png', value: 10, suit: 'Spades' },
    { image: '../../../../assets/img/poker-cards/queen_of_spades.png', value: 10, suit: 'Spades' },
    { image: '../../../../assets/img/poker-cards/king_of_spades.png', value: 10, suit: 'Spades' },
    { image: '../../../../assets/img/poker-cards/ace_of_spades.png', value: 11, suit: 'Spades' },
  ];
  private playerHand: Card[] = [];

  getRandomPlayerHand(): Card[] {
    this.playerHand = [];
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * this.pokerCards.length);
      const selectedCard = this.pokerCards[randomIndex];
      this.playerHand.push(selectedCard);
      this.pokerCards.splice(randomIndex, 1); 
    }
    return this.playerHand;
  }

  
}
