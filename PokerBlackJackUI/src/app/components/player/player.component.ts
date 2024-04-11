import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PlayerModule } from 'src/app/models/player/player.module';
import { BlackjackService } from 'src/app/services/blackjack.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnInit {
  @Input() player: PlayerModule | any;
  //next is an input parameter which will change the player from creation/edit mode into the game mode
  @Input() gameModeOn: boolean | any;
  playerForm!: FormGroup;

  //injecting the main game service
  constructor(private blackjackService: BlackjackService) {}

  ngOnInit(): void {
    if (this.gameModeOn) {
      this.player.gameModeOn = true;
    }
  }

  //#region CODE FOR EDIT MODE
  //this function is called when the user changes the template value of bankroll. I need to make sure the typed value is a real number
  restrictBankrollInputToNumber(event: any): void {
    const target = event.target as HTMLInputElement;
    // Null check
    if (target !== null) {
      let value = target.value;
      if (value) {
        //check if we have multiple commas or dots. If we do this is a wrong number
        if (
          this.checkIfValueContainsMultipleCharacters(value, ',') ||
          this.checkIfValueContainsMultipleCharacters(value, '.')
        ) {
          target.value = '';
          this.player.bankroll = 0;
          return;
        }
        //replace comma with dot
        if (value.indexOf(',') > -1) {
          value = value.replace(/,/g, '.');
        }
        //and now check if this is a number
        let parsedBankrollValue = Number(value);
        if (isNaN(parsedBankrollValue)) {
          //if parsing fails it means this is not a correct number
          this.player.bankroll = 0;
          target.value = '';
          return;
        }
        this.player.bankroll = parsedBankrollValue;
      }
    }
  }

  //this is used to check if a given string is present multiple times in a source string
  private checkIfValueContainsMultipleCharacters(
    value: string,
    characterToFind: string
  ): boolean {
    if (value.indexOf(characterToFind) > -1) {
      if (value.split(characterToFind).length > 2) {
        return true;
      }
    }
    return false; // dönüş ifadesi eklendi
  }

  //endregion

  //#region CODE FOR GAME ON MODE
  bet(betValue: number): void {
    if (betValue > 0) {
      if (this.player.currentBetValue === undefined) {
        this.player.currentBetValue = 0;
      }
      if (betValue > this.player.bankroll) {
        betValue = this.player.bankroll;
      }
      this.player.currentBetValue += betValue;
      this.player.bankroll -= betValue;
    }
  }

  //this method resets the bet
  resetBet(): void {
    this.player.bankroll += this.player.currentBetValue;
    this.player.currentBetValue = 0;
  }

  //this action method is executed when user clicks on dela card
  dealCard(): void {
    this.blackjackService.dealCard(this.player, false);
  }

  //this method is executed when user decides to stand
  stand(): void {
    this.player.standing = true;
    //and now let the blackjack service know that the dealer can move
    this.blackjackService.playerStands(this.player);
  }

  //#endregion
}
