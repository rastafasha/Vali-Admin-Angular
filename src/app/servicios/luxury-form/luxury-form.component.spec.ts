import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxuryFormComponent } from './luxury-form.component';

describe('LuxuryFormComponent', () => {
  let component: LuxuryFormComponent;
  let fixture: ComponentFixture<LuxuryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuxuryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxuryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
