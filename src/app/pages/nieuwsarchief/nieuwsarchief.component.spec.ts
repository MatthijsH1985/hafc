import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NieuwsarchiefComponent } from './nieuwsarchief.component';

describe('NieuwsarchiefComponent', () => {
  let component: NieuwsarchiefComponent;
  let fixture: ComponentFixture<NieuwsarchiefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NieuwsarchiefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NieuwsarchiefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
