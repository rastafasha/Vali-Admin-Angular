import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAntiageComponent } from './manage-antiage.component';

describe('ManageAntiageComponent', () => {
  let component: ManageAntiageComponent;
  let fixture: ComponentFixture<ManageAntiageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAntiageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAntiageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
