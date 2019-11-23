import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLookComponent } from './manage-look.component';

describe('ManageLookComponent', () => {
  let component: ManageLookComponent;
  let fixture: ComponentFixture<ManageLookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
