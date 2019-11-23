import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiageFormComponent } from './antiage-form.component';

describe('AntiageFormComponent', () => {
  let component: AntiageFormComponent;
  let fixture: ComponentFixture<AntiageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntiageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
