import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCommentsComponent } from './top-comments.component';

describe('LatestCommentsComponent', () => {
  let component: TopCommentsComponent;
  let fixture: ComponentFixture<TopCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopCommentsComponent]
    });
    fixture = TestBed.createComponent(TopCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
