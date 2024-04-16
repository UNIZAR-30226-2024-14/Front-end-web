import { PlayingCardModule } from 'src/app/models/playing-card/playing-card.module';

export interface Player {
  id?: number;
  name: string;
  bankroll: number;
  amountWon: number;
  isDealer?: boolean;
  cards: PlayingCardModule[];
  points: number;
  standing?: boolean;
  gameModeOn?: boolean;
  currentBetValue: number;
  bust?: boolean;
  blackjack?: boolean;
  naturalBlackjack?: boolean;
  winnerOfRound: boolean;
}
