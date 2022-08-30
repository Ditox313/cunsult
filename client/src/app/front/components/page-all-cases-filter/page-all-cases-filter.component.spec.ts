import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAllCasesFilterComponent } from './page-all-cases-filter.component';

describe('PageAllCasesFilterComponent', () => {
  let component: PageAllCasesFilterComponent;
  let fixture: ComponentFixture<PageAllCasesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAllCasesFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAllCasesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
