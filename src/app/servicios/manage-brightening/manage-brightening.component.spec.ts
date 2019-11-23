import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBrighteningComponent } from './manage-brightening.component';

describe('ManageBrighteningComponent', () => {
  let component: ManageBrighteningComponent;
  let fixture: ComponentFixture<ManageBrighteningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBrighteningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBrighteningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
