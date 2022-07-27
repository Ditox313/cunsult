import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCasesListComponent } from './home-cases-list.component';

describe('HomeCasesListComponent', () => {
  let component: HomeCasesListComponent;
  let fixture: ComponentFixture<HomeCasesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCasesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
