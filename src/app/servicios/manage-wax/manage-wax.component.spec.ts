import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWaxComponent } from './manage-wax.component';

describe('ManageWaxComponent', () => {
  let component: ManageWaxComponent;
  let fixture: ComponentFixture<ManageWaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
