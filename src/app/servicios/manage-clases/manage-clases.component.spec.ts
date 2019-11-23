import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClasesComponent } from './manage-clases.component';

describe('ManageClasesComponent', () => {
  let component: ManageClasesComponent;
  let fixture: ComponentFixture<ManageClasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageClasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
