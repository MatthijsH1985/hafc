import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Competitioncomponent } from './competitioncomponent';

describe('CompetitieComponent', () => {
  let component: Competitioncomponent;
  let fixture: ComponentFixture<Competitioncomponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Competitioncomponent]
    });
    fixture = TestBed.createComponent(Competitioncomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
