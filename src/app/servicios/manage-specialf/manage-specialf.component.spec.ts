import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpecialfComponent } from './manage-specialf.component';

describe('ManageSpecialfComponent', () => {
  let component: ManageSpecialfComponent;
  let fixture: ComponentFixture<ManageSpecialfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSpecialfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSpecialfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
