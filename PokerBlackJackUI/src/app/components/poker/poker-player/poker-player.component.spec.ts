import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerPlayerComponent } from './poker-player.component';

describe('PokerPlayerComponent', () => {
  let component: PokerPlayerComponent;
  let fixture: ComponentFixture<PokerPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokerPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokerPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
