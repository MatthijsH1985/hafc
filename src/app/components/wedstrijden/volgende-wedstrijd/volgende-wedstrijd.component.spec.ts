import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolgendeWedstrijdComponent } from './volgende-wedstrijd.component';

describe('VolgendeWedstrijdComponent', () => {
  let component: VolgendeWedstrijdComponent;
  let fixture: ComponentFixture<VolgendeWedstrijdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolgendeWedstrijdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolgendeWedstrijdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
