import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtFormComponent } from './specialt-form.component';

describe('SpecialtFormComponent', () => {
  let component: SpecialtFormComponent;
  let fixture: ComponentFixture<SpecialtFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialtFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
