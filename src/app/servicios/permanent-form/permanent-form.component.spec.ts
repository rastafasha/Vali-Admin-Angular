import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanentFormComponent } from './permanent-form.component';

describe('PermanentFormComponent', () => {
  let component: PermanentFormComponent;
  let fixture: ComponentFixture<PermanentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
