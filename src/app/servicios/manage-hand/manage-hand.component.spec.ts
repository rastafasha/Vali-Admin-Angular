import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHandComponent } from './manage-hand.component';

describe('ManageHandComponent', () => {
  let component: ManageHandComponent;
  let fixture: ComponentFixture<ManageHandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
