"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };

var core_1 = require("@angular/core");
var blackjack_service_1 = require("../../services/blackjack.service");
var LobbyComponent = (function () {
  function LobbyComponent(blackjackService) {
    this.blackjackService = blackjackService;
  }
  LobbyComponent.prototype.ngOnInit = function () {
    var playersFromService = this.blackjackService.getPlayers();
    if (playersFromService !== undefined && playersFromService.length) {
      this.availablePlayers = playersFromService;
      this.numberOfPlayersSelected = this.availablePlayers.length;
      for (var _i = 0, _a = this.availablePlayers; _i < _a.length; _i++) {
        var player = _a[_i];
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
  };
  LobbyComponent.prototype.onNumberOfPlayersSelected = function (
    numberOfPlayers
  ) {
    this.availablePlayers = [];
    this.numberOfPlayersSelected = numberOfPlayers;
    for (var i = 0; i < numberOfPlayers; i++) {
      this.availablePlayers.push({
        id: i,
        name: "",
        bankroll: 0,
        points: 0,
        standing: false,
        isDealer: false,
        gameModeOn: false,
        winnerOfRound: false,
        naturalBlackjack: false,
      });
    }
  };
  
  LobbyComponent.prototype.startGame = function () {
    this.blackjackService.startGame(this.availablePlayers);
  };
  LobbyComponent = __decorate(
    [
      core_1.Component({
        selector: "app-lobby",
        templateUrl: "./app/components/lobby/lobby.component.html",
        styleUrls: ["lobby.component.scss"],
      }),
      __metadata("design:paramtypes", [blackjack_service_1.BlackjackService]),
    ],
    LobbyComponent
  );
  return LobbyComponent;
})();
exports.LobbyComponent = LobbyComponent;

