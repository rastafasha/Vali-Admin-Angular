import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFinancingComponent } from './manage-financing.component';

describe('ManageFinancingComponent', () => {
  let component: ManageFinancingComponent;
  let fixture: ComponentFixture<ManageFinancingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFinancingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFinancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
