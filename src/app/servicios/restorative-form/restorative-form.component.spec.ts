import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorativeFormComponent } from './restorative-form.component';

describe('RestorativeFormComponent', () => {
  let component: RestorativeFormComponent;
  let fixture: ComponentFixture<RestorativeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorativeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorativeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
