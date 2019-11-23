import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SculptingFormComponent } from './sculpting-form.component';

describe('SculptingFormComponent', () => {
  let component: SculptingFormComponent;
  let fixture: ComponentFixture<SculptingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SculptingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SculptingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
