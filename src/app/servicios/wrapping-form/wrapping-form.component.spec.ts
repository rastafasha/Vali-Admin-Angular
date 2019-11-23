import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrappingFormComponent } from './wrapping-form.component';

describe('WrappingFormComponent', () => {
  let component: WrappingFormComponent;
  let fixture: ComponentFixture<WrappingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrappingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrappingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
