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

  //injecting the main game service
  constructor(
    private blackjackService: BlackjackService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    //check if there are some players available
    let playersFromService = this.blackjackService.getPlayers();
    if (playersFromService !== undefined && playersFromService.length) {
      this.availablePlayers = playersFromService;
      this.numberOfPlayersSelected = this.availablePlayers.length;
      //change some properties for each available player
      for (let player of this.availablePlayers) {
        //put it in edit mode
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
        // Şimdi numberOfPlayers değişkeni güvenli bir şekilde kullanılabilir
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

  //this method validates the name and bankroll for each player and then calls the game service to start a new game
  startGame(): void {
    const playerNames: string[] = this.availablePlayers.map(
      (player) => player.name
    );
    this.chatService.setUsernames(playerNames);
    console.log(playerNames); // Tüm oyuncu isimlerinin dizisi
    this.blackjackService.startGame(this.availablePlayers);
  }
}
