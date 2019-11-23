import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaxinfoFormComponent } from './waxinfo-form.component';

describe('WaxinfoFormComponent', () => {
  let component: WaxinfoFormComponent;
  let fixture: ComponentFixture<WaxinfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaxinfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaxinfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
