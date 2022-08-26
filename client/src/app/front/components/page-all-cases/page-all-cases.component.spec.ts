import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAllCasesComponent } from './page-all-cases.component';

describe('PageAllCasesComponent', () => {
  let component: PageAllCasesComponent;
  let fixture: ComponentFixture<PageAllCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAllCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAllCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
