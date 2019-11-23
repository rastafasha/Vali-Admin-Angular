import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrighteningFormComponent } from './brightening-form.component';

describe('BrighteningFormComponent', () => {
  let component: BrighteningFormComponent;
  let fixture: ComponentFixture<BrighteningFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrighteningFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrighteningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
