import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionComponent } from './competition.component';

describe('CompetitieComponent', () => {
  let component: CompetitionComponent;
  let fixture: ComponentFixture<CompetitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetitionComponent]
    });
    fixture = TestBed.createComponent(CompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
