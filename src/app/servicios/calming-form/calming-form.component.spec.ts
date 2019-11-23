import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalmingFormComponent } from './calming-form.component';

describe('CalmingFormComponent', () => {
  let component: CalmingFormComponent;
  let fixture: ComponentFixture<CalmingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalmingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalmingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
