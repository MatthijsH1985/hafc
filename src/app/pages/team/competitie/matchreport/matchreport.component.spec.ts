import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchreportComponent } from './matchreport.component';

describe('MatchreportComponent', () => {
  let component: MatchreportComponent;
  let fixture: ComponentFixture<MatchreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchreportComponent]
    });
    fixture = TestBed.createComponent(MatchreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
