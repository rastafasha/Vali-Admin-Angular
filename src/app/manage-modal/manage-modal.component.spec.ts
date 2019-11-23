import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageModalComponent } from './manage-modal.component';

describe('ManageModalComponent', () => {
  let component: ManageModalComponent;
  let fixture: ComponentFixture<ManageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
