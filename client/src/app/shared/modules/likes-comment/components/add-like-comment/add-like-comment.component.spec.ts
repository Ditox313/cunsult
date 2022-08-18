import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLikeCommentComponent } from './add-like-comment.component';

describe('AddLikeCommentComponent', () => {
  let component: AddLikeCommentComponent;
  let fixture: ComponentFixture<AddLikeCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLikeCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLikeCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
