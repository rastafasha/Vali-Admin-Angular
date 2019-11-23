import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaxFormComponent } from './wax-form.component';

describe('WaxFormComponent', () => {
  let component: WaxFormComponent;
  let fixture: ComponentFixture<WaxFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaxFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
