import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfigEditableComponent } from './user-config-editable.component';

describe('UserConfigComponent', () => {
  let component: UserConfigEditableComponent;
  let fixture: ComponentFixture<UserConfigEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserConfigEditableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserConfigEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
