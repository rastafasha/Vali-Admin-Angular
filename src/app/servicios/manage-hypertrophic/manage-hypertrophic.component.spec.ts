import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHypertrophicComponent } from './manage-hypertrophic.component';

describe('ManageHypertrophicComponent', () => {
  let component: ManageHypertrophicComponent;
  let fixture: ComponentFixture<ManageHypertrophicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHypertrophicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHypertrophicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
