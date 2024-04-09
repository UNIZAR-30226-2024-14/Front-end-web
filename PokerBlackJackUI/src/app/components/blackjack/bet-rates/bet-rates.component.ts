import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bet-rates',
  templateUrl: './bet-rates.component.html',
  styleUrl: './bet-rates.component.scss',
})
export class BetRatesComponent implements OnInit {
  @Input() betRates!: number[];

  constructor() {}

  ngOnInit(): void {}
}
