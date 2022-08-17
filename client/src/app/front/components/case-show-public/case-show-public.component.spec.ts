import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseShowPublicComponent } from './case-show-public.component';

describe('CaseShowPublicComponent', () => {
  let component: CaseShowPublicComponent;
  let fixture: ComponentFixture<CaseShowPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseShowPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseShowPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
