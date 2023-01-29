import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NieuwslijstComponent } from './nieuwslijst.component';

describe('NieuwslijstComponent', () => {
  let component: NieuwslijstComponent;
  let fixture: ComponentFixture<NieuwslijstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NieuwslijstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NieuwslijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
