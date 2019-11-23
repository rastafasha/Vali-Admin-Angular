import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLuxuryComponent } from './manage-luxury.component';

describe('ManageLuxuryComponent', () => {
  let component: ManageLuxuryComponent;
  let fixture: ComponentFixture<ManageLuxuryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLuxuryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLuxuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
