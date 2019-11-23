import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWrappingComponent } from './manage-wrapping.component';

describe('ManageWrappingComponent', () => {
  let component: ManageWrappingComponent;
  let fixture: ComponentFixture<ManageWrappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWrappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWrappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
