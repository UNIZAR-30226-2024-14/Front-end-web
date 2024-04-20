import { TestBed } from '@angular/core/testing';

import { PokerPlayerService } from './poker-player.service';

describe('PokerPlayerService', () => {
  let service: PokerPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokerPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
