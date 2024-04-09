import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-bets',
  templateUrl: './current-bets.component.html',
  styleUrl: './current-bets.component.scss',
})
export class CurrentBetsComponent implements OnInit {
  @Input() currentBets!: number[];
  constructor() {}

  ngOnInit(): void {}
}
