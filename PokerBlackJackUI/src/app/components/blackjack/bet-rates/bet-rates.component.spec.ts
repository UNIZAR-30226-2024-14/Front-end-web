import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetRatesComponent } from './bet-rates.component';

describe('BetRatesComponent', () => {
  let component: BetRatesComponent;
  let fixture: ComponentFixture<BetRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BetRatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BetRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
