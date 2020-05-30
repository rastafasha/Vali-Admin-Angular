import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSpecialComponent } from './manage-special.component';

describe('ManageSpecialComponent', () => {
  let component: ManageSpecialComponent;
  let fixture: ComponentFixture<ManageSpecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSpecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
