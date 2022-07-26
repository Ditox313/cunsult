import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCaseListComponent } from './home-case-list.component';

describe('HomeCaseListComponent', () => {
  let component: HomeCaseListComponent;
  let fixture: ComponentFixture<HomeCaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCaseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
