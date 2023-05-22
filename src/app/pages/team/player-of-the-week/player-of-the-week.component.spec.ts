import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerOfTheWeekComponent } from './player-of-the-week.component';

describe('PlayerOfTheWeekComponent', () => {
  let component: PlayerOfTheWeekComponent;
  let fixture: ComponentFixture<PlayerOfTheWeekComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerOfTheWeekComponent]
    });
    fixture = TestBed.createComponent(PlayerOfTheWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
