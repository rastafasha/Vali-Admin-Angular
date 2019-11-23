import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCalmingComponent } from './manage-calming.component';

describe('ManageCalmingComponent', () => {
  let component: ManageCalmingComponent;
  let fixture: ComponentFixture<ManageCalmingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCalmingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCalmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
