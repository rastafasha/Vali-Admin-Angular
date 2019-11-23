import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSculptingComponent } from './manage-sculpting.component';

describe('ManageSculptingComponent', () => {
  let component: ManageSculptingComponent;
  let fixture: ComponentFixture<ManageSculptingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSculptingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSculptingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
