import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBridalComponent } from './manage-bridal.component';

describe('ManageBridalComponent', () => {
  let component: ManageBridalComponent;
  let fixture: ComponentFixture<ManageBridalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBridalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBridalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
