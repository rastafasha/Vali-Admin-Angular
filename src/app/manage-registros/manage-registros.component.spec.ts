import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRegistrosComponent } from './manage-registros.component';

describe('ManageRegistrosComponent', () => {
  let component: ManageRegistrosComponent;
  let fixture: ComponentFixture<ManageRegistrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRegistrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
