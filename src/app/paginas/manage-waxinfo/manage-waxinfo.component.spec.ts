import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWaxinfoComponent } from './manage-waxinfo.component';

describe('ManageWaxinfoComponent', () => {
  let component: ManageWaxinfoComponent;
  let fixture: ComponentFixture<ManageWaxinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWaxinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWaxinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
