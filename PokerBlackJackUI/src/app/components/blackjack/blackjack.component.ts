import { Component, OnInit } from '@angular/core';
import { DeckService } from './services/deck.service';
import { Card } from './models/card';
import { NotificationService } from 'src/app/services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.scss'],
})
export class BlackjackComponent implements OnInit {
  
  dealerSum: number = 0;
  yourSum: number = 0;
  dealerAceCount: number = 0;
  yourAceCount: number = 0;
  // hidden: string;
  // deck: string[];
  canHit: boolean = true;
  resultMessage: string = '';

  constructor(
    private deckService: DeckService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {
    // Deal cards to players and dealer
    const numberOfPlayers = 5;
    const cardsPerPlayer = 2;
    const cardsPerDealer = 2;

    this.players = this.deckService.dealCardsToPlayers(
      numberOfPlayers,
      cardsPerPlayer
    );
    this.dealer = this.deckService.dealCardsToDealer(cardsPerDealer);
  }

  players: Card[][] = [];
  dealer: Card[] = [];

  // Başlangıçta bet değerlerini sıfırla
  currentBet: number = 0;

  // Örnek olarak, sabit bir bahis oranı ve başlangıçtaki bahis miktarı
  betAmount: number = 10; // Başlangıç bahis miktarı
  initialBetAmount = 100;

  betRates: number[] = [5, 10, 20, 50]; // Bahis oranlarını tutacak dizi
  currentBets: number[] = [this.initialBetAmount]; // Kullanıcıların mevcut bahislerini tutacak dizi
  playerNames: string[] = [
    'Player 1',
    'Player 2',
    'Player 3',
    'Player 4',
    'Player 5',
    'Player 6',
    'Player 7',
    'Player 8',
  ];

  ngOnInit(): void {
    this.startGame();
    window.onresize = () => {
      this.arrangePlayers();
    };
  }

  handleWin(): void {
    this.notificationService.showNotification('Kazandınız!');
  }

  handleLoss(): void {
    this.notificationService.showNotification('Kaybettiniz.');
  }

  handleBlackjack(playerIndex: number): void {
    const playerName = `Player ${playerIndex + 1}`;
    this.notificationService.showNotification(`${playerName} has blackjack!`);
  }

  checkWinners(): void {
    const dealerTotal = this.calculateTotal(this.dealer);
    const numberOfPlayers = this.players.length;

    for (let i = 0; i < numberOfPlayers; i++) {
      const playerTotal = this.calculateTotal(this.players[i]);
      if (playerTotal === dealerTotal) {
        // Berabere durumu
        this.showNotification(`Player ${i + 1} and the dealer tie.`);
      } else if (playerTotal > dealerTotal && playerTotal <= 21) {
        // Oyuncu kazanır
        const winnings = this.currentBets[i] * 2; // Örnek olarak, bahsin iki katı kazanç
        this.showNotification(`Player ${i + 1} wins ${winnings} chips!`);
      } else if (dealerTotal > 21 && playerTotal <= 21) {
        // Dağıtıcı battı, oyuncu kazanır
        const winnings = this.currentBets[i] * 2; // Örnek olarak, bahsin iki katı kazanç
        this.showNotification(`Player ${i + 1} wins ${winnings} chips!`);
      } else if (
        playerTotal <= 21 &&
        dealerTotal <= 21 &&
        playerTotal < dealerTotal
      ) {
        // Oyuncu kazanır
        const winnings = this.currentBets[i] * 2; // Örnek olarak, bahsin iki katı kazanç
        this.showNotification(`Player ${i + 1} wins ${winnings} chips!`);
      } else {
        // Oyuncu kaybeder
        this.showNotification(`Player ${i + 1} loses.`);
      }
    }
  }

  showNotification(message: string): void {
    // Burada bildirim gösterme işlemi yapılabilir, örneğin pop-up veya alert kutusu
    alert(message);
  }

  arrangePlayers(): void {
    const mainPlayerElement = document.querySelector('.main-player');
    const otherPlayerElements = document.querySelectorAll(
      '.other-players .player'
    );

    if (!mainPlayerElement || !otherPlayerElements) return;

    // Ana oyuncuyu ortala
    const mainPlayerRect = mainPlayerElement.getBoundingClientRect();
    const mainPlayerX = mainPlayerRect.x + mainPlayerRect.width / 2;
    const mainPlayerY = mainPlayerRect.y + mainPlayerRect.height / 2;

    // Diğer oyuncuları etrafına yerleştir
    otherPlayerElements.forEach((player: Element) => {
      const playerElement = player as HTMLElement; // Element'i HTMLElement'e dönüştür
      const playerRect = playerElement.getBoundingClientRect();
      const offsetX = mainPlayerX - (playerRect.x + playerRect.width / 2);
      const offsetY = mainPlayerY - (playerRect.y + playerRect.height / 2);
      playerElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  }

  isMainPlayer(index: number): boolean {
    return index === 0;
  }

  updateBetAmount(amount: number): void {
    this.currentBets.push(amount);
  }

  startGame(): void {
    // Dağıtıcıya iki kart dağıt
    this.dealer = this.deckService.dealCardsToDealer(2);

    // Eksik olan oyunculara iki kart dağıt
    const numberOfPlayers = this.players.length;
    for (let i = 0; i < numberOfPlayers; i++) {
      if (this.players[i].length === 0) {
        this.players[i] = this.deckService.dealCardsToPlayers(1, 2)[0];
      }
    }

    // Oyuncuların ve dağıtıcının kart toplamlarını kontrol et ve kazananı belirle
    this.checkPlayersAndDealerTotal();
  }

  checkPlayersAndDealerTotal(): void {
    const numberOfPlayers = this.players.length;

    for (let i = 0; i < numberOfPlayers; i++) {
      const playerTotal = this.calculateTotal(this.players[i]);
      if (playerTotal === 21) {
        this.handlePlayerBlackjack(i);
      } else if (playerTotal > 21) {
        this.handlePlayerBust(i);
      }
    }

    const dealerTotal = this.calculateTotal(this.dealer);
    if (dealerTotal === 21) {
      this.handleDealerBlackjack();
    } else if (dealerTotal > 21) {
      this.handleDealerBust();
    }
  }

  calculateTotal(cards: Card[]): number {
    let total = 0;

    // Kartların değerlerini hesapla
    for (const card of cards) {
      if (card.value === 'A') {
        total += 11; // As başlangıçta 11 sayılacak, sonradan 1 sayılabilir
      } else if (['J', 'Q', 'K'].includes(card.value)) {
        total += 10;
      } else {
        total += parseInt(card.value);
      }
    }

    return total;
  }

  handlePlayerBlackjack(playerIndex: number): void {
    const playerName = this.playerNames[playerIndex];
    const message = `${playerName} has blackjack!`;
    this.notificationService.showNotification(message);
    this.showSnackBar(message);
    // Burada kazanma işlemleri gerçekleştirilebilir
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }

  handlePlayerBust(playerIndex: number): void {
    console.log(`Player ${playerIndex + 1} busted!`);
    // Burada kaybetme işlemleri gerçekleştirilebilir
  }

  handleDealerBlackjack(): void {
    console.log(`Dealer has blackjack!`);
    // Burada kazanma işlemleri gerçekleştirilebilir
  }

  handleDealerBust(): void {
    console.log(`Dealer busted!`);
    // Burada kaybetme işlemleri gerçekleştirilebilir
  }

  // Bet miktarını arttır
  increaseBet(): void {
    this.currentBet += 10;
  }

  // Bet miktarını azalt
  decreaseBet(): void {
    if (this.currentBet >= 10) {
      this.currentBet -= 10;
    }
  }

  // Bet miktarını sıfırla
  resetBet(): void {
    this.currentBet = 0;
  }

  // Bet yap
  placeBet(): void {
    if (this.currentBet > 0) {
      // Kullanıcının bahis miktarını toplam bahis miktarına ekle
      this.betAmount += this.currentBet;
      // Kullanıcının bahis miktarını güncelle
      this.currentBet = 0;
    } else {
      // Eğer bahis miktarı geçerli değilse, kullanıcıya bir uyarı göster
      this.showNotification('Lütfen geçerli bir bahis miktarı girin.');
    }
  }

  playerCardVisibility: boolean[] = [false, false, false]; // Oyuncuların kartlarının görünürlüğü

  togglePlayerCardsVisibility(playerIndex: number): void {
    this.playerCardVisibility[playerIndex] =
      !this.playerCardVisibility[playerIndex];
  }

  // Get Card
  hit(): void {
    // Oyuncunun elindeki kartların toplam değerini hesapla
    const playerTotal = this.calculateTotal(this.players[0]);

    // Eğer oyuncunun toplam değeri 21'e eşit veya daha fazlaysa, kart çekme işlemi yapma
    if (playerTotal >= 21) {
      // Bildirim göster veya gerekli işlemleri yap
      this.showNotification(
        "Kart çekme işlemi yapılamıyor. Elinizin değeri 21'e eşit veya daha fazla."
      );
    } else {
      // Ana oyuncuya kart çek
      const newCard = this.deckService.dealCard();

      // Eğer yeni kart null değilse
      if (newCard !== null) {
        this.players[0].push(newCard);

        // Kart toplamını kontrol et
        const updatedPlayerTotal = this.calculateTotal(this.players[0]);

        // Oyuncunun toplamı 21'i geçtiyse
        if (updatedPlayerTotal > 21) {
          this.handlePlayerBust(0);
        } else if (updatedPlayerTotal === 21) {
          // Oyuncu blackjack yaptıysa
          this.handlePlayerBlackjack(0);
        }
      } else {
        // Eğer yeni kart null ise, oyuncuya kart çekilemediğini belirten bir bildirim göster
        this.showNotification('Kart çekilemedi, destede yeterli kart kalmadı.');
      }
    }
  }
}
