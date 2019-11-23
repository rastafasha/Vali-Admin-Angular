import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpecialtComponent } from './manage-specialt.component';

describe('ManageSpecialtComponent', () => {
  let component: ManageSpecialtComponent;
  let fixture: ComponentFixture<ManageSpecialtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSpecialtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSpecialtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
