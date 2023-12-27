import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentTreeComponent } from './comment-tree.component';

describe('CommentTreeComponent', () => {
  let component: CommentTreeComponent;
  let fixture: ComponentFixture<CommentTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentTreeComponent]
    });
    fixture = TestBed.createComponent(CommentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
