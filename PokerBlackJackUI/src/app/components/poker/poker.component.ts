import { Component, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { PokerService } from "./services/poker.service";
import { HandRank } from "./models/hand.model";
import { PairService } from "./services/pair.service";
import { PokerPlayerService } from "./services/poker-player.service";
import { PokerPlayerComponent } from "./poker-player/poker-player.component";

@Component({
  selector: "app-poker",
  templateUrl: "./poker.component.html",
  styleUrls: ["./poker.component.scss", "../../../styles.scss"],
})
export class PokerComponent implements OnInit {
  constructor(
    private pokerService: PokerService,
    private pairService: PairService,
    private playerService: PokerPlayerService
  ) {}

  playerHand: PokerPlayerComponent["playerHand_"] = [];
  tableHand: any[] = [];
  combinedCards: any[] = [];
  evulatedHands: HandRank = 0;
  handRankMessage: string = "null";
  // isCall = false;

  addOneCard() {
    if(this.tableHand.length < 5) {
      this.tableHand = this.pokerService.addRandomTableOneCard();
      console.log("Table Hand: ", this.tableHand);
      }
   
    // if (PokerPlayerComponent.prototype.callButton()) {
    //   console.log("Called");
    //   this.isCall = true;
    //   this.tableHand = this.pokerService.addRandomTableOneCard();
    // }
  }

  ngOnInit(): void {
    // this.playerHand = this.playerService.getRandomPlayerHand();
    this.tableHand = this.pokerService.getRandomTableCards();
    // this.combinedCards = this.playerHand.concat(this.tableHand);
    this.handRankMessage = this.pairService.evaluateHand(this.combinedCards);
  }
  

  // ngOnChanges(changes: SimpleChanges) {
  //   if ('isCall' in changes) {
  //     if (PokerPlayerComponent.prototype.callButton()) {
  //       console.log("Called");
  //       this.isCall = true;
  //       this.tableHand = this.pokerService.addRandomTableOneCard();
  //     }
  //   }
  // }
}
