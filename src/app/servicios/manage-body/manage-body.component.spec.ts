import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBodyComponent } from './manage-body.component';

describe('ManageBodyComponent', () => {
  let component: ManageBodyComponent;
  let fixture: ComponentFixture<ManageBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
