import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialfFormComponent } from './specialf-form.component';

describe('SpecialfFormComponent', () => {
  let component: SpecialfFormComponent;
  let fixture: ComponentFixture<SpecialfFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialfFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialfFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
