import { Component, OnInit, Output } from '@angular/core';
import { PokerService } from './services/poker.service';
import { HandRank } from './models/hand.model';
import { PairService } from './services/pair.service';

@Component({
  selector: 'app-poker',
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.scss', '../../../styles.scss'],
})
export class PokerComponent implements OnInit {
  constructor(
    private pokerService: PokerService,
    private pairService : PairService
  ) {}

  playerHand: any[] = [];
  tableHand: any[] = [];
  combinedCards: any[] = [];
  evulatedHands: HandRank = 0;
  handRankMessage: string = 'null';


  ngOnInit(): void {
    this.playerHand = this.pokerService.getRandomPlayerHand();
    this.tableHand = this.pokerService.getRandomTableCards();
    this.combinedCards = this.playerHand.concat(this.tableHand);
    this.handRankMessage = this.pairService.evaluateHand(this.combinedCards);
  }
}