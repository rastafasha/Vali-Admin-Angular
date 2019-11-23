import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypertrophicFormComponent } from './hypertrophic-form.component';

describe('HypertrophicFormComponent', () => {
  let component: HypertrophicFormComponent;
  let fixture: ComponentFixture<HypertrophicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HypertrophicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypertrophicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
