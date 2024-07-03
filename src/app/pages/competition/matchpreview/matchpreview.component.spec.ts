import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchpreviewComponent } from './matchpreview.component';

describe('MatchpreviewComponent', () => {
  let component: MatchpreviewComponent;
  let fixture: ComponentFixture<MatchpreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchpreviewComponent]
    });
    fixture = TestBed.createComponent(MatchpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
