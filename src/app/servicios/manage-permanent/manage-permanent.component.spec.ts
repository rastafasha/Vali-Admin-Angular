import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePermanentComponent } from './manage-permanent.component';

describe('ManagePermanentComponent', () => {
  let component: ManagePermanentComponent;
  let fixture: ComponentFixture<ManagePermanentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePermanentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePermanentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
