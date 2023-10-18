import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShophomepageComponent } from './shophomepage.component';

describe('ShophomepageComponent', () => {
  let component: ShophomepageComponent;
  let fixture: ComponentFixture<ShophomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShophomepageComponent]
    });
    fixture = TestBed.createComponent(ShophomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
