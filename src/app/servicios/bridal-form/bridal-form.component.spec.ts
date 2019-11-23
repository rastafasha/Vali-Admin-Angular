import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BridalFormComponent } from './bridal-form.component';

describe('BridalFormComponent', () => {
  let component: BridalFormComponent;
  let fixture: ComponentFixture<BridalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BridalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BridalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
