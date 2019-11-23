import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandFormComponent } from './hand-form.component';

describe('HandFormComponent', () => {
  let component: HandFormComponent;
  let fixture: ComponentFixture<HandFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
