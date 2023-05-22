import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitieComponent } from './competitie.component';

describe('CompetitieComponent', () => {
  let component: CompetitieComponent;
  let fixture: ComponentFixture<CompetitieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetitieComponent]
    });
    fixture = TestBed.createComponent(CompetitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
