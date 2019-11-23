import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRestorativeComponent } from './manage-restorative.component';

describe('ManageRestorativeComponent', () => {
  let component: ManageRestorativeComponent;
  let fixture: ComponentFixture<ManageRestorativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRestorativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRestorativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
