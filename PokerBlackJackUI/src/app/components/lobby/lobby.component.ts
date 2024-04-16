import { Component, OnInit } from '@angular/core';
import { BlackjackService } from 'src/app/services/blackjack.service';
import { Player } from '../player/player';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss',
})
export class LobbyComponent implements OnInit {
  numberOfPlayersSelected!: number;
  availablePlayers!: Player[];

  constructor(
    private blackjackService: BlackjackService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    let playersFromService = this.blackjackService.getPlayers();
    if (playersFromService !== undefined && playersFromService.length) {
      this.availablePlayers = playersFromService;
      this.numberOfPlayersSelected = this.availablePlayers.length;
      for (let player of this.availablePlayers) {
        player.gameModeOn = false;
        player.cards = [];
        player.currentBetValue = 0;
        player.winnerOfRound = false;
        player.bust = false;
        player.blackjack = false;
        player.naturalBlackjack = false;
        player.amountWon = 0;
        player.points = 0;
        player.standing = false;
      }
    }
  }

  onNumberOfPlayersSelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target instanceof HTMLSelectElement) {
      const numberOfPlayers = parseInt(target.value, 10);
      if (!isNaN(numberOfPlayers)) {
        this.availablePlayers = [];
        this.numberOfPlayersSelected = numberOfPlayers;
        for (let i = 0; i < numberOfPlayers; i++) {
          this.availablePlayers.push({
            id: i,
            name: '',
            bankroll: 0,
            points: 0,
            standing: false,
            isDealer: false,
            gameModeOn: false,
            winnerOfRound: false,
            naturalBlackjack: false,
            amountWon: 0,
            cards: [],
            currentBetValue: 0,
          });
        }
      }
    }
  }

  isGameStartValid(): boolean {
    for (let player of this.availablePlayers) {
      if (!player.name || player.bankroll <= 0) {
        return false;
      }
    }
    return true;
  }

  startGame(): void {
    const playerNames: string[] = this.availablePlayers.map(
      (player) => player.name
    );
    this.chatService.setUsernames(playerNames);
    console.log(playerNames);
    this.blackjackService.startGame(this.availablePlayers);
  }
}
