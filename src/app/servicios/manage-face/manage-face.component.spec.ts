import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFaceComponent } from './manage-face.component';

describe('ManageFaceComponent', () => {
  let component: ManageFaceComponent;
  let fixture: ComponentFixture<ManageFaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
