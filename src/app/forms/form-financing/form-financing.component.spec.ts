import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFinancingComponent } from './form-financing.component';

describe('FormFinancingComponent', () => {
  let component: FormFinancingComponent;
  let fixture: ComponentFixture<FormFinancingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFinancingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFinancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
