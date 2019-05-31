import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodessaiComponent } from './periodessai.component';

describe('PeriodessaiComponent', () => {
  let component: PeriodessaiComponent;
  let fixture: ComponentFixture<PeriodessaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodessaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodessaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
